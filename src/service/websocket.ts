import SockJS from "sockjs-client";
import Stomp, { Client } from "stompjs";
import { nanoid } from "nanoid";
import {Storage} from '@/utils/storage'

export class WebSocketService {
  private stompClient: Client | null = null;
  private clientId: string;
  private token: string|null;

  constructor() {
    this.clientId = nanoid();
    this.token = Storage.getItem('token');
  }

  connect(): Promise<Client> {
    return new Promise((resolve, reject) => {
      if (!this.token) {
        console.warn("No JWT token found");
      }

      const socket = new SockJS(`http://localhost:9000/pets/ws?token=${encodeURIComponent(this.token!)}`);
      this.stompClient = Stomp.over(socket);
      const headers = {
        Authorization: `Bearer ${this.token}`,
      };

      this.stompClient.connect(
        headers,
        () => {
          if (this.stompClient) {
            resolve(this.stompClient);
          } else {
            reject(new Error("Failed to initialize stompClient"));
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  send(destination: string, body: any) {
    const headers = this.token ? { Authorization: `Bearer ${this.token}` } : {};
    this.stompClient?.send(destination, headers, JSON.stringify(body));
  }

  disconnect() {
    this.stompClient?.disconnect(() => {});
  }

  getClientId(): string {
    return this.clientId;
  }
}
