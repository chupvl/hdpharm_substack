def get_amino_acid_smiles():
    # Dictionary mapping single-letter code to a canonical SMILES (neutral, free amino acid form)
    aa_smiles = {
        'A': 'NC(CC)=O',
        'R': 'NC(CCCNC(N)=N)=O',
        'N': 'NC(CC(=O)N)=O',
        'D': 'NC(CC(=O)O)=O',
        'C': 'NC(CS)=O',
        'E': 'NC(CCC(=O)O)=O',
        'Q': 'NC(CCC(=O)N)=O',
        'G': 'NC(C)=O',
        'H': 'NC(Cc1c[nH]cn1)=O',
        'I': 'NC(C(C)CC)=O',
        'L': 'NC(CC(C)C)=O',
        'K': 'NC(CCCCN)=O',
        'M': 'NC(CCSC)=O',
        'F': 'NC(CCc1ccccc1)=O',
        'P': 'NC1CCC(C1)=O',
        'S': 'NC(CO)=O',
        'T': 'NC(C(O)C)=O',
        'W': 'NC(Cc1c[nH]c2ccccc12)=O',
        'Y': 'NC(Cc1ccc(O)cc1)=O',
        'V': 'NC(C(C)C)=O'
    }
    return aa_smiles

def insulin_sequence(chain='A'):
    # Human insulin:
    # A-chain: GIVEQCCTSICSLYQLENYCN (21 residues)
    # B-chain: FVNQHLCGSHLVEALYLVCGERGFFYTPKT (30 residues)
    if chain.upper() == 'A':
        return "GIVEQCCTSICSLYQLENYCN"
    elif chain.upper() == 'B':
        return "FVNQHLCGSHLVEALYLVCGERGFFYTPKT"
    else:
        raise ValueError("Chain must be 'A' or 'B'.")

def get_insulin_smiles(chain='A'):
    aa_smiles = get_amino_acid_smiles()
    sequence = insulin_sequence(chain)
    smiles_list = []
    for residue in sequence:
        if residue in aa_smiles:
            smiles_list.append(aa_smiles[residue])
        else:
            smiles_list.append(None)  # In case a non-standard residue appears
    return smiles_list

# Example usage:
if __name__ == "__main__":
    # Get SMILES for A-chain of insulin
    a_chain_smiles = get_insulin_smiles('A')
    print("A-chain SMILES:")
    for res, smi in zip(insulin_sequence('A'), a_chain_smiles):
        print(res, smi)

    # Get SMILES for B-chain of insulin
    b_chain_smiles = get_insulin_smiles('B')
    print("\nB-chain SMILES:")
    for res, smi in zip(insulin_sequence('B'), b_chain_smiles):
        print(res, smi)
