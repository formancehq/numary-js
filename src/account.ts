import { Account as AccountBase } from './spec/types/Account';
import { AccountWithVolumesAndBalances } from './spec/types/AccountWithVolumesAndBalances';

export interface AccountSummary extends AccountBase {}
export interface Account extends AccountWithVolumesAndBalances {}