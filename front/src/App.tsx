import type { Component } from "solid-js";

import logo from "./logo.svg";
import styles from "./App.module.css";
import {
  Account,
  Address,
  Deadline,
  NetworkType,
  PlainMessage,
  TransactionHttp,
  TransferTransaction,
  UInt64,
} from "symbol-sdk";

const gh = "7FCCD304802016BEBBCD342A332F91FF1F3BB5E902988B352697BE245F48E836";

const acc = Account.createFromPrivateKey(
  "=== YOUR PRIVATE KEY ===",
  NetworkType.TEST_NET
);
const address = "=== RECEIPENT ADDRESS ===";

const App: Component = () => {
  const submit = () => {
    const tx = TransferTransaction.create(
      Deadline.create(1637848847),
      Address.createFromRawAddress(address),
      [],
      PlainMessage.create("hello symbol"),
      NetworkType.TEST_NET,
      UInt64.fromUint(2000000)
    );

    const signedTx = acc.sign(tx, gh);

    new TransactionHttp("https://sym-test.opening-line.jp:3001")
      .announce(signedTx)
      .subscribe(
        (x) => {
          console.log("x", x);
        },
        (err) => {
          console.error(err);
        }
      );
  };
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
        <button onClick={submit}>SUBMIT</button>
      </header>
    </div>
  );
};

export default App;
