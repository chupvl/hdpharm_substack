import React, { useState, useEffect } from 'react';
import { Calculator, Info, Beaker } from 'lucide-react';

const CyclicPeptideCalculator = () => {
  const [length, setLength] = useState(6);
  const [uniqueAA, setUniqueAA] = useState(4);
  const [result, setResult] = useState(null);
  const [explanation, setExplanation] = useState('');

  // Calculate Euler's totient function
  const eulerTotient = (n) => {
    let result = n;
    for (let p = 2; p * p <= n; p++) {
      if (n % p === 0) {
        while (n % p === 0) n /= p;
        result -= result / p;
      }
    }
    if (n > 1) result -= result / n;
    return Math.floor(result);
  };

  // Get all divisors of a number
  const getDivisors = (n) => {
    const divisors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        divisors.push(i);
        if (i !== n / i) {
          divisors.push(n / i);
        }
      }
    }
    return divisors.sort((a, b) => a - b);
  };

  // Calculate cyclic peptides using Burnside's lemma (rotational symmetry only)
  const calculateCyclicPeptides = (L, U) => {
    if (L <= 0 || U <= 0) return 0;

    const divisors = getDivisors(L);
    let rotationalSum = 0;

    // Calculate rotational contribution using Burnside's lemma
    for (const d of divisors) {
      const phi_d = eulerTotient(d);
      const power = L / d;
      rotationalSum += phi_d * Math.pow(U, power);
    }

    const rotationalResult = rotationalSum / L;
    return Math.floor(rotationalResult);
  };

  useEffect(() => {
    if (length > 0 && uniqueAA > 0) {
      const calculated = calculateCyclicPeptides(length, uniqueAA);
      setResult(calculated);
      
      setExplanation(`
        Calculated using Burnside's lemma for rotational symmetry.
        This considers peptides that look the same when rotated as identical, which is standard for cyclic peptide combinatorial analysis.
      `);
    }
  }, [length, uniqueAA]);

  const handlePreset = (aaCount) => {
    setUniqueAA(aaCount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Beaker className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Cyclic Peptide Calculator</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate the number of unique cyclic peptides based on peptide length and available amino acids using Burnside's lemma for combinatorial analysis.
          </p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">
            This calculator considers only <strong>classical head-to-tail cyclization</strong> (N-terminus to C-terminus peptide bond formation).
          </p>
        </div>

        <div className="flex gap-6">
          {/* Input Panel */}
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5" />
              Parameters
            </h2>

            {/* Length Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Peptide Length (L)
              </label>
              <input
                type="number"
                min="1"
                max="50"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Enter peptide length"
              />
              <p className="text-xs text-gray-500 mt-1">Number of amino acid positions in the cycle</p>
              
              {/* Common Cyclic Peptides */}
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Common Cyclic Peptides</label>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <button
                    onClick={() => setLength(5)}
                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-left transition-colors"
                  >
                    5 (Small cycles)
                  </button>
                  <button
                    onClick={() => setLength(6)}
                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-left transition-colors"
                  >
                    6 (Hexapeptides)
                  </button>
                  <button
                    onClick={() => setLength(9)}
                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-left transition-colors"
                  >
                    9 (Oxytocin/Vasopressin)
                  </button>
                  <button
                    onClick={() => setLength(10)}
                    className="px-2 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-left transition-colors"
                  >
                    10 (Gramicidin S)
                  </button>
                  <button
                    onClick={() => setLength(11)}
                    className="px-2 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded text-left transition-colors"
                  >
                    11 (Voclosporin*)
                  </button>
                  <button
                    onClick={() => setLength(13)}
                    className="px-2 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded text-left transition-colors"
                  >
                    13 (MK-0616†/Daptomycin)
                  </button>
                </div>
              </div>
            </div>

            {/* Unique AA Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unique Amino Acids (U)
              </label>
              <input
                type="number"
                min="1"
                max="25"
                value={uniqueAA}
                onChange={(e) => setUniqueAA(parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                placeholder="Number of unique amino acids"
              />
              <p className="text-xs text-gray-500 mt-1">Different amino acids available for peptide construction</p>
            </div>

            {/* Presets */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">Quick Presets</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handlePreset(20)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  20 (Standard)
                </button>
                <button
                  onClick={() => handlePreset(21)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  21 (+ Selenocys)
                </button>
                <button
                  onClick={() => handlePreset(4)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  4 (Basic set)
                </button>
                <button
                  onClick={() => handlePreset(8)}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm transition-colors"
                >
                  8 (Subset)
                </button>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="flex-1 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Results</h2>
            
            {result !== null ? (
              <div className="space-y-6">
                {/* Main Result */}
                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    {result.toLocaleString()}
                  </div>
                  <div className="text-gray-600">
                    Unique Cyclic Peptides
                  </div>
                  {result > 1000000 && (
                    <div className="text-sm text-gray-500 mt-1">
                      ({result.toExponential(2)})
                    </div>
                  )}
                </div>

                {/* Parameters Summary */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-semibold text-gray-800">{length}</div>
                    <div className="text-sm text-gray-600">Peptide Length</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <div className="text-2xl font-semibold text-gray-800">{uniqueAA}</div>
                    <div className="text-sm text-gray-600">Unique Amino Acids</div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-800">
                      <strong>Calculation Method:</strong>
                      <p className="mt-1">{explanation}</p>
                    </div>
                  </div>
                </div>

                {/* Formula Display */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-800 mb-2">Formula Used:</h3>
                  <div className="text-sm font-mono bg-white p-3 rounded border">
                    (1/L) × Σ[φ(d) × U^(L/d)] for all divisors d of L
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    where φ(d) is Euler's totient function, L = {length}, U = {uniqueAA}
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-12">
                <Calculator className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Enter valid parameters to see results</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-3">About This Calculator</h3>
          <div className="text-sm text-gray-600 space-y-2">
            <p>
              This calculator uses <strong>Burnside's lemma</strong> to count distinct cyclic arrangements, accounting for rotational symmetry in cyclic peptides.
            </p>
            <p>
              <strong>Rotational symmetry:</strong> Peptides that are identical when rotated are counted as one unique structure.
            </p>
            <div className="mt-4 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                <strong>Peptide Status:</strong> *FDA approved, †Merck pipeline (Phase 3). Note: MK-0616 is Merck's leading macrocyclic peptide in development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CyclicPeptideCalculator;
