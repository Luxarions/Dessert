import React, { useState } from 'react';
import { BUILD_STEPS } from '../data/pipelineData';
import { BuildStepInfo } from '../types';
import {
  GitFork,
  ArrowRight,
  Cpu,
  Layers,
  CheckCircle2,
  AlertTriangle,
  FolderInput,
  FolderOutput,
  Terminal,
  FileCode,
  ShieldCheck
} from 'lucide-react';

export const ArchitectureFlow: React.FC = () => {
  const [selectedStep, setSelectedStep] = useState<BuildStepInfo>(BUILD_STEPS[0]);

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="p-1.5 rounded-lg bg-pink-500/10 text-pink-300 border border-pink-500/20">
            <GitFork className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-stone-100 tracking-tight">
            Pipeline Architecture & Topological Execution
          </h2>
        </div>
        <p className="text-sm text-stone-400 max-w-3xl leading-relaxed">
          The Dessert Assets pipeline follows a deterministic topological sequence orchestrated by <code className="text-pink-300 font-mono">scripts/build-all.js</code>. Steps marked as required immediately fail the build on error, while optional media steps degrade gracefully.
        </p>
      </div>

      {/* Sequential Pipeline Flow Diagram */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-300 font-mono flex items-center gap-2">
          <Layers className="w-4 h-4 text-pink-300" />
          Topological Execution Chain (build-all.js)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUILD_STEPS.map((step, idx) => {
            const isSelected = selectedStep.id === step.id;
            return (
              <div
                key={step.id}
                onClick={() => setSelectedStep(step)}
                className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col justify-between space-y-3 relative group ${
                  isSelected
                    ? 'bg-pink-500/15 border-pink-400 ring-2 ring-pink-400/20 shadow-md'
                    : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 hover:bg-stone-800/40'
                }`}
              >
                {/* Step header */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-stone-500 group-hover:text-pink-300 transition-colors">
                    Step {idx + 1}
                  </span>
                  {step.required ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/10 text-red-300 border border-red-500/20 font-mono">
                      Required
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-stone-800 text-stone-400 border border-stone-700 font-mono">
                      Optional
                    </span>
                  )}
                </div>

                {/* Step Name */}
                <div>
                  <h4 className="text-base font-bold text-stone-100 group-hover:text-pink-200 transition-colors">
                    {step.name}
                  </h4>
                  <div className="text-xs font-mono text-stone-400 mt-0.5">
                    {step.script}
                  </div>
                </div>

                {/* Quick input -> output */}
                <div className="text-[11px] text-stone-500 pt-2 border-t border-stone-800/80 flex items-center justify-between">
                  <span>~{step.estimatedDurationMs}ms</span>
                  <span className="text-pink-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Inspect <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Step Deep Dive Card */}
      <div className="bg-stone-900 border border-stone-800 rounded-2xl p-6 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
                Detailed Inspection
              </span>
              <h3 className="text-lg font-bold text-stone-100">
                {selectedStep.name} Pipeline Module
              </h3>
            </div>
            <p className="text-xs text-stone-400 mt-1">
              Command: <code className="text-pink-300 font-mono">{selectedStep.command}</code>
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-stone-400">Exit strategy on failure:</span>
            {selectedStep.required ? (
              <span className="text-red-400 font-semibold flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" />
                Abort entire pipeline (exit code 1)
              </span>
            ) : (
              <span className="text-amber-300 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Gracefully skip to next step
              </span>
            )}
          </div>
        </div>

        {/* Inputs vs Outputs Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Input files */}
          <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-300 font-mono uppercase tracking-wider">
              <FolderInput className="w-4 h-4 text-pink-300" />
              Source Input Assets
            </div>
            <ul className="space-y-2 text-xs font-mono text-stone-400">
              {selectedStep.inputs.map((inp, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                  <span className="text-stone-200">{inp}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Output files */}
          <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-stone-300 font-mono uppercase tracking-wider">
              <FolderOutput className="w-4 h-4 text-emerald-400" />
              Target Output Artifacts
            </div>
            <ul className="space-y-2 text-xs font-mono text-stone-400">
              {selectedStep.outputs.map((out, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span className="text-emerald-300">{out}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
