import React, { useState, useEffect } from 'react';
import { X, Plus, Calendar, FileText, Save, Clock, AlertCircle } from 'lucide-react';
import { Patient, Priority } from '../types';

interface HistoryEntry {
  id: string;
  date: string;
  description: string;
  doctor: string;
}

interface PatientHistoryModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PatientHistoryModal: React.FC<PatientHistoryModalProps> = ({ patient, isOpen, onClose }) => {
  const [newEntry, setNewEntry] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  // Reset state when patient changes
  useEffect(() => {
    if (isOpen && patient) {
      // Simulate fetching history
      setHistory([
        { 
          id: '1', 
          date: '10/10/2023', 
          description: 'Paciente relatou melhoria nas dores de cabeça após medicação.',
          doctor: 'Dr. Gabriel Martins'
        },
        { 
          id: '2', 
          date: '15/09/2023', 
          description: 'Exames de sangue de rotina solicitados. Pressão arterial 120/80. Recomendado dieta com menos sódio.',
          doctor: 'Dra. Ana Silva'
        },
        { 
          id: '3', 
          date: '20/08/2023', 
          description: 'Primeira consulta. Histórico de hipertensão na família. Queixa de tonturas esporádicas.',
          doctor: 'Dr. Gabriel Martins'
        },
      ]);
      setNewEntry('');
    }
  }, [isOpen, patient]);

  if (!isOpen || !patient) return null;

  const handleAddHistory = () => {
    if (!newEntry.trim()) return;
    
    const entry: HistoryEntry = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('pt-BR'),
      description: newEntry,
      doctor: 'Dr. Gabriel Martins' // Hardcoded logged in doctor for now
    };
    
    setHistory([entry, ...history]);
    setNewEntry('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all">
      <div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img src={patient.avatar} alt={patient.name} className="w-14 h-14 rounded-full object-cover border-2 border-slate-100" />
              {patient.priority === Priority.URGENT && (
                 <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-red-500 ring-2 ring-white" title="Urgente" />
              )}
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{patient.name}</h2>
              <div className="flex items-center gap-3 text-sm text-slate-500 mt-0.5">
                <span className="flex items-center gap-1">
                  <Clock size={14} /> {patient.waitTime} de espera
                </span>
                <span>•</span>
                <span className={`font-medium ${patient.priority === Priority.URGENT ? 'text-red-600' : 'text-slate-600'}`}>
                  {patient.priority}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Fechar"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-slate-50/50">
          <div className="p-6 space-y-8">
            
            {/* Current Complaint */}
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <h3 className="text-sm font-semibold text-orange-800 mb-1 flex items-center gap-2">
                <AlertCircle size={16} />
                Queixa Atual
              </h3>
              <p className="text-orange-900">{patient.complaint}</p>
            </div>

            {/* Add New Entry */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-1">
               <div className="p-3 border-b border-slate-100 bg-slate-50/50 rounded-t-lg flex items-center justify-between">
                 <h3 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                   <Plus size={16} className="text-teal-600" />
                   Adicionar Evolução
                 </h3>
               </div>
               <div className="p-4">
                 <textarea
                   value={newEntry}
                   onChange={(e) => setNewEntry(e.target.value)}
                   placeholder="Descreva a evolução do paciente, sintomas observados e conduta..."
                   className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 min-h-[120px] text-sm resize-y placeholder:text-slate-400"
                 />
                 <div className="flex justify-end mt-3">
                   <button 
                     onClick={handleAddHistory}
                     disabled={!newEntry.trim()}
                     className="flex items-center gap-2 bg-teal-600 text-white px-5 py-2.5 rounded-lg hover:bg-teal-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm shadow-sm"
                   >
                     <Save size={18} />
                     Salvar Evolução
                   </button>
                 </div>
               </div>
            </div>

            {/* History Timeline */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-900 flex items-center gap-2">
                  <FileText size={20} className="text-slate-400" />
                  Histórico Clínico
                </h3>
                <button className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline">
                  Ver histórico completo
                </button>
              </div>
              
              <div className="space-y-0 relative pl-4 border-l-2 border-slate-200 ml-2">
                {history.map((item) => (
                  <div key={item.id} className="relative pb-8 last:pb-0 pl-6 group">
                    {/* Timeline Dot */}
                    <div className="absolute -left-[1.65rem] top-1 w-4 h-4 rounded-full bg-white border-2 border-slate-300 group-hover:border-teal-500 transition-colors"></div>
                    
                    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-100 transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3 border-b border-slate-50 pb-3">
                        <div className="flex items-center gap-2">
                           <Calendar size={14} className="text-slate-400" />
                           <span className="text-sm font-semibold text-slate-700">{item.date}</span>
                        </div>
                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">
                          {item.doctor}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};