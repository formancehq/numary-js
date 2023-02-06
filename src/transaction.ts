import { TransactionData } from "./spec/types/TransactionData";
import { TransactionResponse } from "./spec/types/TransactionResponse";

export interface Transaction extends TransactionData {}
export interface TransactionRequest extends TransactionResponse {}