# DIAM-poc

##### Sequence Diagram
![photo_6334821018228605232_y](https://github.com/user-attachments/assets/84f87f0f-c792-489c-9916-5e75efecb329)


Link for the diagram - [Here](https://sequencediagram.org/index.html#initialData=C4S2BsFMAIBEQIYFtoGkCaBhaBJAzngK4IB2AxjAGLgD2A7gFAMAOCATqGSKycNAIIATJCBIt2nbqT4AJAJ7NIbPCADmJNFjgI8ACwBGNdoPEcQXHn3xElm7AGUlANyUMEZYDTbQAqnlesZhbS0ADqIIKqkMCmkpbazMxMDKpsNITMcJDMtHLQAPLkugii0ADWcmTQDEIiJAC0AHzQ8orKahoY2LA6BkZsggBcmDQkJJAeeHCIKABCaXT+3qEI4FDAADokhdDAujCFZMWlXdAjJABmatAACghRTK1KKup22nqGxk24BIS2p442C42MM2JAEMBIFNAcCwqt1skSDRIdAaLDrH9vADnEpBvVoAhoOM6NNkNA6PDotAQFMyGCIZBBFt8Tc2CAnAzypA8lFgFM8J4wYJqRoAKKwABqzOgosETmgghoVRwwpp0DBFyUkHIkEZIt2+wKRRKGgqVTIoyuqiYGP+WhhtnqTSe7Vepx6H36Q1RxtE9TN0Atl2uEWSLpenS0Hr6xmgTuatVEgzgo0gTG1JgYAGIs3GnfiALKiPijI4m8qVJh+JTfHqJQbV7yqGhQ3Y0BKZUjCsjgcxlKajaAAIglShAFzyXSH0H0hGAnjETDrmXjYQivOTy6mQpAYMm0EISzwTHCkSp9SzqW5zVtWPtOJB0AA4qKACrQAD0vPqOn8wHqSDRAgggQggiLIjAaK2LebwOt4l5gnIyb4sw9KBDAv5UoBwDAaBAAUNI2AMEQADTQE4ZBkahNA0BcACUNq-HaDgPk6CHXqeG6YcAAD62G4ThTBIiiUHLOuVJZngFT6OAfyDPYuj0FMh62HQxR8NxbYzjAdSQpmqTpJk-AEFSRa8OBImwpxElSXIMlyWcozjB4cJrNEVZLAAPBe9mQM01nAMm9iQswAAMybnM5fCwDg-AFq5CIMI2PmyX5a5noFZy9mQ-Y+tAZl8KcM5zguyRCRBqJWeJfCSdJqVBa+oo3AAjMmlCECQwowSsbkxElXkpX8-nVUFIWtb4SzQBcHWCFM8BknBCXRFs0B4XQYC6NAdSohc0CULq0AAFTQAALDFcUMWVJ7VXG7FyDeTF3ixQK4rc+T2O+H5ggAjn8Ar1KWxwNGaFmQeij2wQ+0B3RF9KQlMsVTWkKDzSgi09YlMHYi93hsVe93pby0DJjchAyeYXJ5LRuD8GVwlg7YAXQ7ZvkNU1ABMsPgiir5sIeECiGmDABYNaWNqN2Sc9AABKkC-VCfCNlpdLczAvNzr24zkhtNPlZZthK7Vdn1dA9gdFMwB8wKmswJbpB4O4oCjB5NYXizqWNAFybq9bguBnDjLJEzF74w9RGQzjgw3O9n26dAADesVkY2PEUr1ZHcXxQEgThAC+oOVdBEPY7CMNxjTW3FhbhqnNx0q8-bmpPQSJl8J4B5LNKjhWPwBJkBaHV8HQkBqLobftqFjHhyXjoh4hnsjbAqbXRlbHu0N4sCK3+XFnq9iEP3eDTWscgAITpp1TBAA)


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






