import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Briefcase, Building2, Search, MessageCircle, X, Send, Menu, ChevronRight, Filter, Award, Shield, Code, TrendingUp, FileText, Lightbulb } from 'lucide-react';

// Datos de normas de calidad
const normasData = [
  {
    id: 'iso27001',
    nombre: 'ISO/IEC 27001',
    foco: 'Gestión',
    ambito: 'Cualquier tamaño',
    exigencia: 'Alta',
    dominio: 'Seguridad',
    descripcion: 'Sistema de Gestión de la Seguridad de la Información (SGSI)',
    caracteristicas: ['Certificación', 'Gestión de Riesgos', 'Tríada C.I.D.'],
    perfiles: ['empresa', 'freelancer'],
    color: 'bg-red-100 text-red-800'
  },
  {
    id: 'iso25010',
    nombre: 'ISO/IEC 25010',
    foco: 'Producto',
    ambito: 'Cualquier tamaño',
    exigencia: 'Media',
    dominio: 'Calidad de Producto',
    descripcion: 'Modelo de Calidad del Producto de Software',
    caracteristicas: ['8 Características', 'Métricas', 'Evaluación'],
    perfiles: ['estudiante', 'freelancer', 'empresa'],
    color: 'bg-blue-100 text-blue-800'
  },
  {
    id: 'cmmi',
    nombre: 'CMMI',
    foco: 'Proceso',
    ambito: 'Grandes empresas',
    exigencia: 'Muy Alta',
    dominio: 'Madurez',
    descripcion: 'Capability Maturity Model Integration',
    caracteristicas: ['5 Niveles', 'Mejora Continua', 'Transformación'],
    perfiles: ['empresa'],
    color: 'bg-purple-100 text-purple-800'
  },
  {
    id: 'iso29110',
    nombre: 'ISO/IEC 29110',
    foco: 'Proceso',
    ambito: 'PYMES',
    exigencia: 'Baja',
    dominio: 'Ciclo de Vida',
    descripcion: 'Norma para Entidades Muy Pequeñas (VSE)',
    caracteristicas: ['Ligera', 'Gestión de Proyectos', 'Implementación'],
    perfiles: ['estudiante', 'freelancer'],
    color: 'bg-green-100 text-green-800'
  },
  {
    id: 'iso12207',
    nombre: 'ISO/IEC 12207',
    foco: 'Proceso',
    ambito: 'Cualquier tamaño',
    exigencia: 'Media-Alta',
    dominio: 'Ciclo de Vida',
    descripcion: 'Procesos del Ciclo de Vida del Software',
    caracteristicas: ['Marco de Referencia', 'Procesos Completos', 'Estandarización'],
    perfiles: ['freelancer', 'empresa'],
    color: 'bg-indigo-100 text-indigo-800'
  },
  {
    id: 'spice',
    nombre: 'ISO/IEC 15504 (SPICE)',
    foco: 'Proceso',
    ambito: 'Grandes empresas',
    exigencia: 'Muy Alta',
    dominio: 'Evaluación',
    descripcion: 'Software Process Improvement and Capability Determination',
    caracteristicas: ['6 Niveles Capacidad', 'Evaluación', 'Evidencia Objetiva'],
    perfiles: ['empresa'],
    color: 'bg-purple-100 text-purple-800'
  }
];

const perfilesData = [
  {
    id: 'estudiante',
    nombre: 'Estudiante/Aprendiz',
    icon: BookOpen,
    descripcion: 'Aprendiendo sobre calidad de software',
    color: 'from-blue-500 to-cyan-500',
    recomendaciones: ['ISO/IEC 29110', 'ISO/IEC 25010', 'Prácticas básicas'],
    enfoque: 'Fundamentos y prácticas esenciales'
  },
  {
    id: 'freelancer',
    nombre: 'Desarrollador Independiente',
    icon: Users,
    descripcion: 'Profesional independiente o freelancer',
    color: 'from-green-500 to-emerald-500',
    recomendaciones: ['ISO/IEC 29110', 'ISO/IEC 27001', 'ISO/IEC 25010'],
    enfoque: 'Prácticas ligeras de alto impacto'
  },
  {
    id: 'empresa',
    nombre: 'Gestor de Proyecto/Empresa',
    icon: Building2,
    descripcion: 'Gestión empresarial y certificación',
    color: 'from-purple-500 to-pink-500',
    recomendaciones: ['ISO/IEC 27001', 'CMMI', 'ISO/IEC 15504'],
    enfoque: 'Certificación y madurez organizacional'
  }
];

const App = () => {
  const [perfilActivo, setPerfilActivo] = useState(null);
  const [vistaActual, setVistaActual] = useState('home');
  const [chatAbierto, setChatAbierto] = useState(false);
  const [mensajeChat, setMensajeChat] = useState('');
  const [conversacion, setConversacion] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [filtros, setFiltros] = useState({
    foco: 'todos',
    exigencia: 'todos',
    dominio: 'todos'
  });

  const normasFiltradas = normasData.filter(norma => {
    if (perfilActivo && !norma.perfiles.includes(perfilActivo)) return false;
    if (filtros.foco !== 'todos' && norma.foco !== filtros.foco) return false;
    if (filtros.exigencia !== 'todos' && norma.exigencia !== filtros.exigencia) return false;
    if (filtros.dominio !== 'todos' && norma.dominio !== filtros.dominio) return false;
    return true;
  });

  const enviarMensaje = async () => {
    if (!mensajeChat.trim()) return;

    const nuevoMensaje = { rol: 'usuario', contenido: mensajeChat };
    setConversacion(prev => [...prev, nuevoMensaje]);
    setMensajeChat('');
    setCargando(true);

    try {
      const contexto = `Eres un experto en normas de calidad de software. El usuario es un ${perfilesData.find(p => p.id === perfilActivo)?.nombre || 'profesional'}. 
      
Normas disponibles: ${normasData.map(n => n.nombre).join(', ')}.

Responde de forma clara y práctica sobre normas de calidad de software, enfocándote en aplicaciones reales.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [
            ...conversacion.map(m => ({
              role: m.rol === 'usuario' ? 'user' : 'assistant',
              content: m.contenido
            })),
            { role: 'user', content: mensajeChat }
          ],
          system: contexto
        })
      });

      const data = await response.json();
      const respuesta = data.content.find(c => c.type === 'text')?.text || 'Lo siento, no pude procesar tu consulta.';

      setConversacion(prev => [...prev, { rol: 'asistente', contenido: respuesta }]);
    } catch (error) {
      setConversacion(prev => [...prev, { 
        rol: 'asistente', 
        contenido: 'Error al conectar con el asistente. Por favor, intenta de nuevo.' 
      }]);
    } finally {
      setCargando(false);
    }
  };

  const SelectorPerfil = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Normas de Calidad de Software
          </h1>
          <p className="text-xl text-gray-300">
            Sistema interactivo para aprender y aplicar estándares internacionales
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {perfilesData.map(perfil => {
            const Icon = perfil.icon;
            return (
              <div
                key={perfil.id}
                onClick={() => {
                  setPerfilActivo(perfil.id);
                  setVistaActual('normas');
                }}
                className="bg-white rounded-xl p-6 cursor-pointer transform transition-all hover:scale-105 hover:shadow-2xl"
              >
                <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${perfil.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{perfil.nombre}</h3>
                <p className="text-gray-600 mb-4">{perfil.descripcion}</p>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Enfoque:</p>
                  <p className="text-sm text-gray-600">{perfil.enfoque}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">¿Qué encontrarás?</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Shield className="w-6 h-6 text-cyan-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Comparador de Normas</h3>
                <p className="text-sm text-gray-300">Analiza y compara diferentes estándares</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Award className="w-6 h-6 text-green-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Mapas Conceptuales</h3>
                <p className="text-sm text-gray-300">Visualiza la estructura de cada norma</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Code className="w-6 h-6 text-purple-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Casos Prácticos</h3>
                <p className="text-sm text-gray-300">Ejemplos aplicados a proyectos reales</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <MessageCircle className="w-6 h-6 text-pink-400 flex-shrink-0" />
              <div>
                <h3 className="font-semibold">Asistente Claude</h3>
                <p className="text-sm text-gray-300">Consultas personalizadas sobre normas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ComparadorNormas = () => (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Comparador de Normas - {perfilesData.find(p => p.id === perfilActivo)?.nombre}
          </h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Lightbulb className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900">Recomendaciones para tu perfil:</h3>
                <p className="text-blue-800">
                  {perfilesData.find(p => p.id === perfilActivo)?.recomendaciones.join(', ')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-800">Filtros</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foco</label>
                <select
                  value={filtros.foco}
                  onChange={(e) => setFiltros({...filtros, foco: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  <option value="Producto">Producto</option>
                  <option value="Proceso">Proceso</option>
                  <option value="Gestión">Gestión</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Exigencia</label>
                <select
                  value={filtros.exigencia}
                  onChange={(e) => setFiltros({...filtros, exigencia: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todas</option>
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                  <option value="Muy Alta">Muy Alta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dominio</label>
                <select
                  value={filtros.dominio}
                  onChange={(e) => setFiltros({...filtros, dominio: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="todos">Todos</option>
                  <option value="Seguridad">Seguridad</option>
                  <option value="Calidad de Producto">Calidad de Producto</option>
                  <option value="Madurez">Madurez</option>
                  <option value="Ciclo de Vida">Ciclo de Vida</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {normasFiltradas.map(norma => (
            <div key={norma.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className={`${norma.color} px-6 py-4`}>
                <h3 className="text-xl font-bold">{norma.nombre}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{norma.descripcion}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Foco:</span>
                    <span className="font-semibold text-gray-800">{norma.foco}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Ámbito:</span>
                    <span className="font-semibold text-gray-800">{norma.ambito}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Exigencia:</span>
                    <span className={`font-semibold ${
                      norma.exigencia === 'Muy Alta' ? 'text-red-600' :
                      norma.exigencia === 'Alta' ? 'text-orange-600' :
                      norma.exigencia === 'Media' ? 'text-yellow-600' :
                      'text-green-600'
                    }`}>{norma.exigencia}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Dominio:</span>
                    <span className="font-semibold text-gray-800">{norma.dominio}</span>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Características:</p>
                  <div className="flex flex-wrap gap-2">
                    {norma.caracteristicas.map((car, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                        {car}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {normasFiltradas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No se encontraron normas con los filtros seleccionados</p>
          </div>
        )}
      </div>
    </div>
  );

  const ChatAsistente = () => (
    <div className={`fixed bottom-4 right-4 z-50 ${chatAbierto ? 'w-96' : 'w-auto'}`}>
      {!chatAbierto ? (
        <button
          onClick={() => setChatAbierto(true)}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      ) : (
        <div className="bg-white rounded-lg shadow-2xl flex flex-col h-[500px]">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Asistente Claude</span>
            </div>
            <button onClick={() => setChatAbierto(false)} className="hover:bg-white/20 rounded p-1">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversacion.length === 0 && (
              <div className="text-center text-gray-500 mt-8">
                <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="text-sm">¡Hola! Soy tu asistente de normas de calidad.</p>
                <p className="text-xs mt-2">Pregúntame sobre cualquier estándar o práctica.</p>
              </div>
            )}
            
            {conversacion.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.rol === 'usuario' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 ${
                  msg.rol === 'usuario' 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.contenido}</p>
                </div>
              </div>
            ))}
            
            {cargando && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}} />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={mensajeChat}
                onChange={(e) => setMensajeChat(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                placeholder="Escribe tu consulta..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                onClick={enviarMensaje}
                disabled={cargando || !mensajeChat.trim()}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {vistaActual === 'home' && <SelectorPerfil />}
      
      {vistaActual === 'normas' && (
        <>
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setVistaActual('home');
                    setPerfilActivo(null);
                  }}
                  className="text-blue-600 hover:text-blue-800 font-semibold"
                >
                  ← Cambiar Perfil
                </button>
                <span className="text-gray-400">|</span>
                <span className="text-gray-700">
                  {perfilesData.find(p => p.id === perfilActivo)?.nombre}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Award className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800 font-semibold">Normas de Calidad</span>
              </div>
            </div>
          </nav>
          <ComparadorNormas />
        </>
      )}

      {perfilActivo && <ChatAsistente />}
    </div>
  );
};

export default App;