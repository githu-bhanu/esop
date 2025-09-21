import { Injectable } from '@angular/core';
// import { connect, MqttClient } from 'mqtt';
import mqtt from 'mqtt';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MqttService {
  private client: any;
  private isConnected: boolean = false;
  private topics: { [key: string]: Subject<string> } = {}; // Object to store Subjects for each topic

  constructor() {}

  // Connect to the MQTT broker
  connect() {
    this.client = mqtt.connect('wss://broker.hivemq.com:8884/mqtt'); // WebSocket secure

    this.client.on('connect', () => {
      console.log('Connected to broker');
      this.isConnected = true;
    });

    this.client.on('message', (topic, payload) => {
      console.log(`Received message from ${topic}: ${payload.toString()}`);
      // Emit message to the specific topic's subject
      if (this.topics[topic]) {
        this.topics[topic].next(payload.toString());
      }
    });
  }

  // Subscribe to a specific topic
  subscribe(topic: string) {
    if (this.isConnected) {
      this.client.subscribe(topic);
      if (!this.topics[topic]) {
        // Create a new subject for this topic
        this.topics[topic] = new Subject<string>();
      }
      console.log(`Subscribed to ${topic}`);
    }
  }

  // Get an observable for a specific topic
  getMessageObservable(topic: string) {
    if (!this.topics[topic]) {
      this.topics[topic] = new Subject<string>(); // Create a new subject if it doesn't exist
    }
    return this.topics[topic].asObservable(); // Return observable for this topic
  }

  // Publish a message to a specific topic
  publish(topic: string, message: string) {
    if (this.isConnected) {
      this.client.publish(topic, message);
      console.log(`Published message to ${topic}: ${message}`);
    }
  }

  // Unsubscribe from a topic
  unsubscribe(topic: string) {
    if (this.isConnected) {
      this.client.unsubscribe(topic);
      console.log(`Unsubscribed from ${topic}`);
    }
  }

  // Disconnect from the broker
  disconnect() {
    if (this.client) {
      this.client.end();
      this.isConnected = false;
      console.log('Disconnected from broker');
    }
  }
}


// Usage

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { MqttService } from './mqtt.service';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-component1',
//   template: `
//     <h1>Component 1</h1>
//     <p>Received: {{ message }}</p>
//     <input [(ngModel)]="inputMsg" placeholder="Type a message">
//     <button (click)="publish()">Publish</button>
//   `
// })
// export class Component1Component implements OnInit, OnDestroy {
//   public message: string = '';
//   public inputMsg: string = '';
//   private topic: string = 'comp1/topic1'; // Specific topic for Component 1
//   private messageSubscription!: Subscription;

//   constructor(private mqttService: MqttService) {}

//   ngOnInit() {
//     // Connect to the MQTT broker
//     this.mqttService.connect();

//     // Subscribe to the specific topic for Component 1
//     this.mqttService.subscribe(this.topic);

//     // Subscribe to the message observable for this topic
//     this.messageSubscription = this.mqttService.getMessageObservable(this.topic)
//       .subscribe(msg => {
//         this.message = msg; // Update component with the latest message
//       });
//   }

//   ngOnDestroy() {
//     // Unsubscribe from the message stream and disconnect from the broker when the component is destroyed
//     if (this.messageSubscription) {
//       this.messageSubscription.unsubscribe();
//     }
//     this.mqttService.disconnect();
//   }

//   // Publish message to the specific topic
//   publish() {
//     if (this.inputMsg) {
//       this.mqttService.publish(this.topic, this.inputMsg);
//       this.inputMsg = ''; // Clear input after publishing
//     }
//   }
// }
