class InsulinMolecule:
    def __init__(self, name, category, role, molecular_weight=None):
        self.name = name
        self.category = category
        self.role = role
        self.molecular_weight = molecular_weight

def get_insulin_related_molecules():
    """
    Returns a dictionary of molecules involved in insulin synthesis, secretion,
    and signaling pathway.
    """
    molecules = {
        # Insulin and its precursors
        "preproinsulin": InsulinMolecule(
            name="Preproinsulin",
            category="Precursor",
            role="Initial protein product of insulin gene transcription",
            molecular_weight=11.5
        ),
        "proinsulin": InsulinMolecule(
            name="Proinsulin",
            category="Precursor",
            role="Intermediate form before final insulin processing",
            molecular_weight=9.0
        ),
        "insulin": InsulinMolecule(
            name="Insulin",
            category="Hormone",
            role="Final active hormone",
            molecular_weight=5.8
        ),
        
        # Insulin signaling molecules
        "insulin_receptor": InsulinMolecule(
            name="Insulin Receptor",
            category="Receptor",
            role="Membrane receptor that binds insulin"
        ),
        "irs1": InsulinMolecule(
            name="IRS-1",
            category="Substrate",
            role="Insulin receptor substrate 1, key signaling intermediate"
        ),
        "pi3k": InsulinMolecule(
            name="PI3K",
            category="Enzyme",
            role="Phosphatidylinositol 3-kinase, crucial for insulin signaling"
        ),
        "akt": InsulinMolecule(
            name="AKT/Protein Kinase B",
            category="Enzyme",
            role="Key signaling kinase in insulin pathway"
        ),
        
        # Glucose transport molecules
        "glut4": InsulinMolecule(
            name="GLUT4",
            category="Transporter",
            role="Insulin-regulated glucose transporter"
        ),
        
        # Processing enzymes
        "pc1": InsulinMolecule(
            name="Prohormone convertase 1",
            category="Enzyme",
            role="Processes proinsulin to insulin"
        ),
        "pc2": InsulinMolecule(
            name="Prohormone convertase 2",
            category="Enzyme",
            role="Processes proinsulin to insulin"
        ),
        
        # Regulatory molecules
        "ptp1b": InsulinMolecule(
            name="PTP1B",
            category="Enzyme",
            role="Negative regulator of insulin signaling"
        ),
        "socs3": InsulinMolecule(
            name="SOCS3",
            category="Regulator",
            role="Suppressor of cytokine signaling 3, regulates insulin sensitivity"
        )
    }
    return molecules

def analyze_insulin_pathway(molecule_name=None):
    """
    Analyzes and prints information about insulin-related molecules.
    If molecule_name is provided, shows specific information about that molecule.
    """
    molecules = get_insulin_related_molecules()
    
    if molecule_name:
        if molecule_name.lower() in molecules:
            mol = molecules[molecule_name.lower()]
            print(f"\nMolecule: {mol.name}")
            print(f"Category: {mol.category}")
            print(f"Role: {mol.role}")
            if mol.molecular_weight:
                print(f"Molecular Weight: {mol.molecular_weight} kDa")
        else:
            print(f"Molecule '{molecule_name}' not found in the insulin pathway database.")
        return
    
    # Print summary by category
    categories = set(mol.category for mol in molecules.values())
    for category in sorted(categories):
        print(f"\n{category} molecules:")
        for mol in molecules.values():
            if mol.category == category:
                print(f"- {mol.name}: {mol.role}")

def get_molecules_by_category(category):
    """
    Returns a list of molecules belonging to a specific category.
    """
    molecules = get_insulin_related_molecules()
    return [mol for mol in molecules.values() if mol.category.lower() == category.lower()]
