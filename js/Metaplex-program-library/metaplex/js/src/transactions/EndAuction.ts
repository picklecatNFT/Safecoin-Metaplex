import BN from 'bn.js';
import { Borsh, Transaction } from '@metaplex-foundation/mpl-core';
import {
  PublicKey,
  SYSVAR_CLOCK_PUBKEY,
  TransactionCtorFields,
  TransactionInstruction,
} from '@safecoin/web3.js';
import { ParamsWithStore } from '@metaplex-foundation/mpl-token-vault';
import { AuctionProgram } from '@metaplex-foundation/mpl-auction';
import { MetaplexProgram } from '../MetaplexProgram';

export class EndAuctionArgs extends Borsh.Data<{ reveal: BN[] | null }> {
  static readonly SCHEMA = this.struct([
    ['instruction', 'u8'],
    ['reveal', { kind: 'option', type: [BN, BN] }],
  ]);

  instruction = 20;
  reveal: BN[] | null;
}

type EndAuctionParams = {
  auction: PublicKey;
  auctionExtended: PublicKey;
  auctionManager: PublicKey;
  auctionManagerAuthority: PublicKey;
  reveal?: BN[];
};

export class EndAuction extends Transaction {
  constructor(options: TransactionCtorFields, params: ParamsWithStore<EndAuctionParams>) {
    super(options);
    const {
      store,
      auction,
      auctionExtended,
      auctionManager,
      auctionManagerAuthority,
      reveal = null,
    } = params;

    const data = EndAuctionArgs.serialize({ reveal });

    this.add(
      new TransactionInstruction({
        keys: [
          {
            pubkey: auctionManager,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: auction,
            isSigner: false,
            isWritable: true,
          },
          {
            pubkey: auctionExtended,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: auctionManagerAuthority,
            isSigner: true,
            isWritable: false,
          },
          {
            pubkey: store,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: AuctionProgram.PUBKEY,
            isSigner: false,
            isWritable: false,
          },
          {
            pubkey: SYSVAR_CLOCK_PUBKEY,
            isSigner: false,
            isWritable: false,
          },
        ],
        programId: MetaplexProgram.PUBKEY,
        data,
      }),
    );
  }
}
