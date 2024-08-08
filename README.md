# DIAM-poc

##### Sequence Diagram
![Screenshot from 2024-07-26 11-51-49](https://github.com/user-attachments/assets/6011fc19-6824-4205-ad61-8444a17f53ae)

## Proposed Flow

##### Issuer Wallet Creation
- An issuer wallet will be created and stored on a server that is managed by the issuer.

##### Miniting KYC Asset
1. User Request
   - User A requests the issuer to mint a KYC asset.
2. Create Intermediary Account
   - The issuer creates an INTERMEDIARY ACCOUNT (IA) key pair.
3. Fund Intermediary Account
   - User A transfers current Fee * 4 DIAMS to the INTERMEDIARY ACCOUNT activating it.
4. Mint the Asset
   - Once the IA is funded, the IA mints the KYC asset to User A.
   - The IA updates the data field with the CID (Content Identifier) containing the following:
      - Issuer DID (Decentralized Identifier)
      - Issuer Domain
      - User Wallet Address
5. Set Account Weight to Zero
   - The IA sets its weight to zero, ensuring that the account can no longer make transactions.
6. Record Metadata
   - At this point, the asset is minted, and its metadata is permanently recorded on the blockchain.

##### Verification of Asset
1. Asset Submission
   - User A provides the KYC asset to the verifier.
2. Verify Asset Metadata
   - The verifier checks the issuer's data field to ensure the following:
       - The Issuer DID match with the recorded DID.
       - The Issuer Domain matches the recorded domain.
       - The wallet address in the metadata matches User A's wallet address.
3. Confirmation
   - If all the conditions are satisfied, the verifier confirms the asset as verified.

##### Key Components
  - **Issuer Wallet**: Managed by the issuer, this wallet is used to create and manage KYC assets. 
  - **Intermediary Account (IA)**: A temporary account used to mint KYC assets. 
  - **User Wallet**: The wallet belonging to User A, which receives the KYC asset.

##### Data Structure
CID (Content Identifier)
The CID Contains the following information:
  - **Issuer DID**: Decentralized Identifier of the issuer.
  - **Issuer Domain**: The domain associated with the issuer.
  - **User Wallet Address**: The wallet address of User A.

##### Account Weight
  - The weight of the INTERMEDIARY ACCOUNT is set to zero after minting the asset to ensure it cannot perform any further transactions.

##### Process Flow
1. **Request**: User A requests a KYC asset. 
2. **Intermediary Account**: Issuer creates an INTERMEDIARY ACCOUNT. 
3. **Funding**: User A funds the INTERMEDIARY ACCOUNT. 
4. **Minting**: INTERMEDIARY ACCOUNT mints the asset to User A. 
5. **Metadata Recording**: INTERMEDIARY ACCOUNT updates its data field with CID and sets IA weight to zero. 
6. **Verification**: User A provides the asset to the verifier, who checks the metadata and confirms the asset.

- By Calvin J and Raj Patil






