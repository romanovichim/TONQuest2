# TON Speedrun 

## 🚩 Challenge 2: Chatbot Contract

🎫 Сompile, test and deploy chatbot smart contract to the test network. Getting Acquainted with the TON Actor Model

🌟 The final deliverable will be pipeline for smart contract development.

💬 Meet other builders working in TON and get help in the [official dev chat](https://t.me/tondev_eng) or [TON learn tg](https://t.me/ton_learn)


# Checkpoint 0: 🎁 Install 🎒

Required: 
* [Git](https://git-scm.com/downloads)
* [Node](https://nodejs.org/en/download/) (Use Version 18 LTS)
* [Yarn](https://classic.yarnpkg.com/en/docs/install/#mac-stable)

(⚠️ Don't install the linux package `yarn` make sure you install yarn with `npm i -g yarn` or even `sudo npm i -g yarn`!)

```sh
git clone https://github.com/romanovichim/TONQuest2.git
```
```sh
cd challenge-2
yarn install
```
---

# Checkpoint 1: 💻 Chatbot Smart Contract 🔈

Here is a project on `ton/sandbox`, let's look at the smart contract, go to the folder `contracts` and file `chatbot.fc`

    #include "imports/stdlib.fc";

    () recv_internal(int msg_value, cell in_msg, slice in_msg_body) impure {
      ;; if you send over 0.001 TON to this contract, it will reply you "doge"!

      ;; ignore the sender if they send in less than 0.001 TON - needed for fee
      ;; to send the reply message
      if (msg_value < 10000000) {
        return ();
      }

      ;; parse the in_msg cell to get the info we want
      slice cs = in_msg.begin_parse(); ;; turn in_msg into a slice
      int flags = cs~load_uint(4); ;; load the flags. we don't need this tho
      slice sender_address = cs~load_msg_addr(); ;; load the sender address

      slice msg_text = "reply"; ;; "doge" will be our reply comment

      ;; build the message cell that we want this contract to send back
      ;; see https://ton.org/docs/develop/smart-contracts/messages
      cell msg = begin_cell()
          .store_uint(0x18, 6)
          .store_slice(sender_address) ;; reply back to the original sender
          .store_coins(100) ;; send 100 nanoton so it's not a zero-value transaction which wallets may ignore 
          .store_uint(0, 1 + 4 + 4 + 64 + 32 + 1 + 1)
          .store_uint(0, 32) ;; call op == 0 because we are not calling an op
          .store_slice(msg_text) ;; store "doge" as a comment
      .end_cell();

      ;; send the message https://ton.org/docs/develop/func/stdlib/#send_raw_message
      send_raw_message(msg, 3);

    }

This smart contract, upon receiving a message with a TON value greater than 0.001, sends back a message with 'reply' message. To deploy a smart contract to the test network, you need to:
- bring him to hexBoC form
- send a message to the network for deployment

---

# Checkpoint 2: 💿 Compile hexBoC 🔨

A cell represents a data structure on TON Blockchain. Bag of Cells (BoC) is a format for serializing cells into byte arrays. For the easement of working with a smart contract, we first convert it into a hex representation BoC,and then we use it as it is convenient for us in tests, deployment, etc.

Compile the smart contract with the command:

```sh
yarn compile
```

hexBoc can be viewed in `build` folder.


---

# Checkpoint 3: 🎾 Tests 😵

Before deploying a contract, it’s worth running it through tests, it’s just for this that it’s to use `ton/sandbox`. Sample test is in the folder `tests`. Run it with command:

```sh
yarn test
```

Make sure all test is colored green.

---

# Checkpoint 4: 🚀 Deploy 🚀

It's time to deploy, to do this, run the command:

```sh
yarn deploy
```

Scan the QR code with the Tonkeeper and confirm the transaction in the application.
Below the QR code there is a link to the blockchain explorer with your smart contract, save it.

For Example:

![image](https://user-images.githubusercontent.com/18370291/253951126-77652e61-8b29-4ffb-aece-de3307f78cea.png)

---

# Checkpoint 5: 📮 Send Message to Your Chatbot 📮

Now let's test our smart contract directly on the testnet. For your ease, I have prepared a script that will allow you to quickly send a transaction:

```sh
yarn send
```

Scan the QR code with the Tonkeeper and confirm the transaction in the application.
Below the QR code there is a link to the blockchain explorer with your smart contract, in the next step we need this link.

---

# Checkpoint 6:  🏄 Check your Dialog 🏄

Open the explorer link you saved earlier and see if the chatbot responded to you:

![image](https://user-images.githubusercontent.com/18370291/253953065-ad730aca-b657-49b5-a2cf-7143cdc26dd7.png)

Congratulations, you have compiled, tested and deployed a smart contract in the TON testnet!

---


# ⚔️ Side Quests


Quick results are great, but to play longer, enjoy the ecosystem, I suggest you the following tutorials:
- Let's analyze the [smart contract](https://github.com/romanovichim/TonFunClessons_Eng/blob/main/lessons/pipeline/chatbot.md) of the chatbot
- Learn how to write [tests](https://github.com/romanovichim/TonFunClessons_Eng/blob/main/lessons/pipeline/chatbottest.md) for smart contracts that send messages
 

# 🏆 Reward 

Congratulations on successfully completing this challenge! Before we conclude, let's take a quick look at the exciting reward awaiting you from the <a target="_blank" href="https://getgems.io/collection/EQDZwCyBbgYionONWorPUX6PrmFh3PHdJtl8fDMqo3mYUfux">"TON Speedrun"</a> collection:

<img style="border-radius: 10pt; margin: 25pt auto; display: block;" width="40%" src="https://ton-devrel.s3.eu-central-1.amazonaws.com/tonspeedrun/0/image.jpg">

Ready to claim your reward? Just scan the QR code, which can be generated using the script below:
```sh
yarn reward
```