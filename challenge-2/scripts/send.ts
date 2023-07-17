import { Cell, beginCell, contractAddress, toNano} from "ton-core";
import { hex } from "../build/main.compiled.json";
import { TonClient } from "ton";
import qs from "qs";
import qrcode from "qrcode-terminal";
import { num } from "../build/rndnumber.json";

const API_URL = "https://testnet.toncenter.com/api/v2"



async function onchainScript() {
    const codeCell = Cell.fromBoc(Buffer.from(hex,"hex"))[0];
    const dataCell = beginCell().storeUint(num,64).endCell();  ;

    const address = contractAddress(0,{
        code: codeCell,
        data: dataCell,
    });
    

    console.log("Address: ",address)
    
    let transactionLink =
    'https://app.tonkeeper.com/transfer/' +
    address.toString({
        testOnly: true,
    }) +
    "?" +
    qs.stringify({
        text: "tonspeedrun2",
        amount: toNano("0.6").toString(10),
    });

    console.log("Transaction link:",transactionLink);


    qrcode.generate(transactionLink, {small: true }, (qr) => {
        console.log(qr);
    });


    console.log("Check txes");
    
    let scanAddr = 
    'https://testnet.tonscan.org/address/' +
    address.toString({
        testOnly: true,
    })

    console.log(scanAddr);
    
}

onchainScript();