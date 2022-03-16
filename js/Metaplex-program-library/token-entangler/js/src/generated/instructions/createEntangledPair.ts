import * as web3 from '@safecoin/web3.js';
import * as beet from '@metaplex-foundation/beet';

import * as splToken from '@safecoin/safe-token';

export type CreateEntangledPairInstructionArgs = {
  bump: number;
  reverseBump: number;
  tokenAEscrowBump: number;
  tokenBEscrowBump: number;
  price: beet.bignum;
  paysEveryTime: boolean;
};
const createEntangledPairStruct = new beet.BeetArgsStruct<
  CreateEntangledPairInstructionArgs & {
    instructionDiscriminator: number[];
  }
>(
  [
    ['instructionDiscriminator', beet.fixedSizeArray(beet.u8, 8)],
    ['bump', beet.u8],
    ['reverseBump', beet.u8],
    ['tokenAEscrowBump', beet.u8],
    ['tokenBEscrowBump', beet.u8],
    ['price', beet.u64],
    ['paysEveryTime', beet.bool],
  ],
  'CreateEntangledPairInstructionArgs',
);
export type CreateEntangledPairInstructionAccounts = {
  treasuryMint: web3.PublicKey;
  payer: web3.PublicKey;
  transferAuthority: web3.PublicKey;
  authority: web3.PublicKey;
  mintA: web3.PublicKey;
  metadataA: web3.PublicKey;
  editionA: web3.PublicKey;
  mintB: web3.PublicKey;
  metadataB: web3.PublicKey;
  editionB: web3.PublicKey;
  tokenB: web3.PublicKey;
  tokenAEscrow: web3.PublicKey;
  tokenBEscrow: web3.PublicKey;
  entangledPair: web3.PublicKey;
  reverseEntangledPair: web3.PublicKey;
};

const createEntangledPairInstructionDiscriminator = [166, 106, 32, 45, 156, 210, 209, 240];

/**
 * Creates a _CreateEntangledPair_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @param args to provide as instruction data to the program
 */
export function createCreateEntangledPairInstruction(
  accounts: CreateEntangledPairInstructionAccounts,
  args: CreateEntangledPairInstructionArgs,
) {
  const {
    treasuryMint,
    payer,
    transferAuthority,
    authority,
    mintA,
    metadataA,
    editionA,
    mintB,
    metadataB,
    editionB,
    tokenB,
    tokenAEscrow,
    tokenBEscrow,
    entangledPair,
    reverseEntangledPair,
  } = accounts;

  const [data] = createEntangledPairStruct.serialize({
    instructionDiscriminator: createEntangledPairInstructionDiscriminator,
    ...args,
  });
  const keys: web3.AccountMeta[] = [
    {
      pubkey: treasuryMint,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: payer,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: transferAuthority,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: authority,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: mintA,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: metadataA,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: editionA,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: mintB,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: metadataB,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: editionB,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: tokenB,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: tokenAEscrow,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: tokenBEscrow,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: entangledPair,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: reverseEntangledPair,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: splToken.TOKEN_PROGRAM_ID,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: web3.SYSVAR_RENT_PUBKEY,
      isWritable: false,
      isSigner: false,
    },
  ];

  const ix = new web3.TransactionInstruction({
    programId: new web3.PublicKey('qntmGodpGkrM42mN68VCZHXnKqDCT8rdY23wFcXCLPd'),
    keys,
    data,
  });
  return ix;
}
