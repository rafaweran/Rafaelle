import React, { useState, useCallback } from 'react';
import { 
  Users, 
  ClipboardCheck, 
  UserPlus, 
  TrendingUp, 
  ChevronRight, 
  Mail, 
  Clock, 
  FileText, 
  MessageSquare,
  AlertCircle,
  ArrowUpRight,
  ArrowRight,
  Send
} from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { PatientHistoryModal } from './components/PatientHistoryModal';
import { CURRENT_DOCTOR, DASHBOARD_STATS, FINANCIAL_STATS, WAITING_LIST } from './constants';
import { NavigationItem, Priority, Patient } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationItem>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inviteEmails, setInviteEmails] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [historyModalOpen, setHistoryModalOpen] = useState(false);

  const handleInvite = useCallback(() => {
    if (!inviteEmails.trim()) return;
    const emails = inviteEmails.split(',').map(e => e.trim());
    alert(`Convites enviados para: ${emails.length} endereços.`);
    setInviteEmails('');
  }, [inviteEmails]);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isOpen={sidebarOpen} 
      />
      
      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopBar doctor={CURRENT_DOCTOR} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Welcome Section */}
            <section className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Olá, {CURRENT_DOCTOR.name}
              </h1>
              <p className="text-slate-500 mt-1">
                Aqui está o resumo dos seus atendimentos e atualizações de hoje.
              </p>
            </section>

            {/* Indicators Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Patients */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-teal-200 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-500">Pacientes Cadastrados</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{DASHBOARD_STATS.totalPatients}</p>
                </div>
                <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Users size={24} />
                </div>
              </div>

              {/* Completed Visits */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-teal-200 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-500">Atendimentos Realizados</p>
                  <p className="text-3xl font-bold text-slate-900 mt-2">{DASHBOARD_STATS.completedVisits}</p>
                </div>
                <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                  <ClipboardCheck size={24} />
                </div>
              </div>

              {/* New Requests */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between group hover:border-teal-200 transition-colors">
                <div>
                  <p className="text-sm font-medium text-slate-500">Solicitações de Novos Pacientes</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <p className="text-3xl font-bold text-slate-900">{DASHBOARD_STATS.newRequests}</p>
                    <span className="inline-block w-2 h-2 rounded-full bg-teal-500"></span>
                  </div>
                  <button className="mt-3 text-sm text-teal-600 font-semibold hover:text-teal-700 flex items-center">
                    Visualizar <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                <div className="h-12 w-12 bg-teal-50 rounded-full flex items-center justify-center text-teal-600 group-hover:bg-teal-100 transition-colors">
                  <UserPlus size={24} />
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Financial Summary Card */}
              <section className="lg:col-span-1 bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                      <TrendingUp size={20} className="text-teal-600" />
                      Ganhos do Mês
                    </h3>
                    <span className="bg-green-50 text-green-700 text-xs font-medium px-2.5 py-0.5 rounded-full">
                      Ativo
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <p className="text-4xl font-bold text-slate-900">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(FINANCIAL_STATS.totalEarnings)}
                      </p>
                      <div className="flex items-center mt-1 text-sm">
                         <span className="text-green-600 font-medium flex items-center">
                           <ArrowUpRight size={16} className="mr-1" />
                           {FINANCIAL_STATS.previousMonthComparison}%
                         </span>
                         <span className="text-slate-400 ml-2">vs. mês anterior</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-slate-500">Último repasse</span>
                        <span className="text-slate-900 font-medium">{FINANCIAL_STATS.lastTransferDate}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-500">Status</span>
                        <span className="text-green-600 font-medium">Confirmado</span>
                      </div>
                    </div>

                    <button className="w-full mt-2 py-2 text-sm font-medium text-teal-600 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors">
                      Ver Detalhes Financeiros
                    </button>
                  </div>
                </div>
              </section>

              {/* Invite Patients Section */}
              <section className="lg:col-span-2 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl shadow-md text-white overflow-hidden relative isolate">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-teal-900 opacity-10 rounded-full blur-2xl pointer-events-none"></div>
                
                <div className="p-8 h-full flex flex-col justify-center relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shadow-sm">
                      <Mail className="text-white" size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Convidar Pacientes
                    </h3>
                  </div>
                  
                  <p className="text-teal-50 mb-6 max-w-lg text-sm leading-relaxed opacity-90 font-medium">
                    Envie o link de cadastro para novos pacientes. Separe múltiplos e-mails utilizando vírgula para envios em massa.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1 relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={18} className="text-slate-400 group-focus-within:text-teal-500 transition-colors" />
                      </div>
                      <input 
                        type="text" 
                        placeholder="exemplo@email.com, paciente@email.com"
                        value={inviteEmails}
                        onChange={(e) => setInviteEmails(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 bg-white border-0 text-slate-900 placeholder-slate-400 rounded-xl shadow-sm focus:ring-2 focus:ring-white/50 focus:outline-none transition-all"
                      />
                    </div>
                    <button 
                      onClick={handleInvite}
                      className="bg-teal-900/80 hover:bg-teal-900 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg hover:shadow-xl backdrop-blur-sm flex items-center justify-center gap-2"
                    >
                      <span>Enviar Convite</span>
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* Waiting List Section */}
            <section className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <MessageSquare size={20} className="text-teal-600" />
                    Fila de Teleorientação
                  </h3>
                  <p className="text-sm text-slate-500">Pacientes aguardando na sala de espera virtual</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                    {WAITING_LIST.length} Aguardando
                  </span>
                  <a href="#" className="text-sm text-teal-600 hover:text-teal-700 font-medium hover:underline">
                    Ver todos
                  </a>
                </div>
              </div>

              <div className="divide-y divide-slate-100">
                {WAITING_LIST.length === 0 ? (
                  <div className="p-8 text-center text-slate-500">
                    Nenhum paciente na fila no momento.
                  </div>
                ) : (
                  WAITING_LIST.map((patient) => (
                    <div key={patient.id} className="p-4 sm:p-6 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                      {/* Avatar & Priority */}
                      <div className="flex items-start md:items-center gap-4 min-w-[200px]">
                        <div className="relative">
                          <img 
                            src={patient.avatar} 
                            alt={patient.name} 
                            className="w-12 h-12 rounded-full object-cover border border-slate-200"
                          />
                          {patient.priority === Priority.URGENT && (
                            <span className="absolute -top-1 -right-1 flex h-3 w-3">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900">{patient.name}</h4>
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium mt-1 ${
                            patient.priority === Priority.URGENT 
                              ? 'bg-red-100 text-red-700' 
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {patient.priority === Priority.URGENT && <AlertCircle size={10} className="mr-1" />}
                            {patient.priority}
                          </span>
                        </div>
                      </div>

                      {/* Wait Time */}
                      <div className="flex items-center gap-2 text-slate-500 min-w-[120px]">
                        <Clock size={16} />
                        <span className="text-sm font-medium">{patient.waitTime}</span>
                      </div>

                      {/* Complaint */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-600 truncate">
                          <span className="font-medium text-slate-900">Queixa:</span> {patient.complaint}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 mt-2 md:mt-0 self-end md:self-center w-full md:w-auto">
                        <button 
                          onClick={() => {
                            setSelectedPatient(patient);
                            setHistoryModalOpen(true);
                          }}
                          className="flex-1 md:flex-none p-2 text-slate-500 hover:bg-slate-200 rounded-lg transition-colors tooltip" 
                          title="Ver Prontuário"
                        >
                          <FileText size={20} />
                        </button>
                        <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm shadow-sm shadow-teal-200">
                          <MessageSquare size={16} />
                          <span>Iniciar</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
              {/* Footer of the list */}
              <div className="bg-slate-50 px-6 py-3 border-t border-slate-200 text-center sm:text-right">
                 <button className="text-xs font-semibold text-slate-500 hover:text-teal-600 transition-colors flex items-center justify-center sm:justify-end gap-1 w-full sm:w-auto">
                   Gerenciar fila completa <ArrowRight size={12} />
                 </button>
              </div>
            </section>

          </div>
        </main>
      </div>
      
      {/* History Modal */}
      <PatientHistoryModal 
        patient={selectedPatient} 
        isOpen={historyModalOpen} 
        onClose={() => setHistoryModalOpen(false)} 
      />
    </div>
  );
}