import React, { useState } from 'react';
import MapaCID from './MapaCid';
import { BookOpen, Users, Building2, MessageCircle, X, Send, Filter, Award, Shield, Code, Lightbulb, Calculator, TrendingUp, AlertCircle, CheckCircle, Info } from 'lucide-react';
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';

// ==================== DATOS ====================

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

// ==================== COMPONENTE CALCULADORA ====================

const CalculadoraMetricas = () => {
  const [metricas, setMetricas] = useState({
    mtbf: '',
    mttr: '',
    tiempoRespuesta: '',
    complejidad: '',
    coberturaPruebas: ''
  });

  const [resultado, setResultado] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMetricas(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calcularScore = () => {
    const mtbf = parseFloat(metricas.mtbf) || 0;
    const mttr = parseFloat(metricas.mttr) || 0;
    const tiempoRespuesta = parseFloat(metricas.tiempoRespuesta) || 0;
    const complejidad = parseFloat(metricas.complejidad) || 0;
    const cobertura = parseFloat(metricas.coberturaPruebas) || 0;

    const scoreFiabilidad = Math.min(100, ((mtbf / 720) * 50) + ((1 - (mttr / 60)) * 50));
    const scoreEficiencia = Math.max(0, 100 - (tiempoRespuesta / 30) * 100);
    const scoreMantenibilidad = Math.max(0, 100 - (complejidad * 5));
    const scoreFuncionalidad = cobertura;
    const scoreSeguridad = (scoreFiabilidad + scoreMantenibilidad) / 2;

    const scoreGeneral = (
      scoreFiabilidad * 0.25 +
      scoreEficiencia * 0.20 +
      scoreMantenibilidad * 0.20 +
      scoreFuncionalidad * 0.20 +
      scoreSeguridad * 0.15
    );

    const datosRadar = [
      { caracteristica: 'Fiabilidad', valor: Math.round(scoreFiabilidad), benchmark: 85 },
      { caracteristica: 'Eficiencia', valor: Math.round(scoreEficiencia), benchmark: 80 },
      { caracteristica: 'Mantenibilidad', valor: Math.round(scoreMantenibilidad), benchmark: 75 },
      { caracteristica: 'Funcionalidad', valor: Math.round(scoreFuncionalidad), benchmark: 90 },
      { caracteristica: 'Seguridad', valor: Math.round(scoreSeguridad), benchmark: 85 }
    ];

    const recomendaciones = [];
    
    if (scoreFiabilidad < 70) {
      recomendaciones.push({
        tipo: 'error',
        area: 'Fiabilidad',
        mensaje: 'MTBF bajo o MTTR alto. Implementa pruebas de regresión y mejora la gestión de errores.'
      });
    }
    
    if (scoreEficiencia < 70) {
      recomendaciones.push({
        tipo: 'warning',
        area: 'Eficiencia',
        mensaje: 'Tiempo de respuesta elevado. Optimiza consultas a BD y considera implementar caché.'
      });
    }
    
    if (scoreMantenibilidad < 70) {
      recomendaciones.push({
        tipo: 'error',
        area: 'Mantenibilidad',
        mensaje: 'Complejidad ciclomática alta. Refactoriza funciones complejas en módulos más pequeños.'
      });
    }
    
    if (scoreFuncionalidad < 80) {
      recomendaciones.push({
        tipo: 'warning',
        area: 'Funcionalidad',
        mensaje: 'Cobertura de pruebas insuficiente. Objetivo: >80% para código crítico.'
      });
    }

    if (recomendaciones.length === 0) {
      recomendaciones.push({
        tipo: 'success',
        area: 'General',
        mensaje: '¡Excelente! Tu software cumple con los estándares de calidad ISO/IEC 25010.'
      });
    }

    setResultado({
      scoreGeneral: Math.round(scoreGeneral),
      datosRadar,
      recomendaciones,
      nivel: scoreGeneral >= 85 ? 'Excelente' : scoreGeneral >= 70 ? 'Bueno' : scoreGeneral >= 50 ? 'Aceptable' : 'Necesita Mejoras'
    });
  };

  const getNivelColor = (nivel) => {
    switch(nivel) {
      case 'Excelente': return 'text-green-600 bg-green-50';
      case 'Bueno': return 'text-blue-600 bg-blue-50';
      case 'Aceptable': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-red-600 bg-red-50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg">
              <Calculator className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Calculadora de Métricas</h1>
              <p className="text-gray-600">ISO/IEC 25010 - Modelo de Calidad del Producto</p>
            </div>
          </div>
          
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <div className="flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Sobre esta calculadora:</p>
                <p>Evalúa la calidad de tu software según 5 características clave del estándar ISO/IEC 25010.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2 text-indigo-600" />
            Ingresa las Métricas de tu Proyecto
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                MTBF - Tiempo Medio Entre Fallos (horas)
              </label>
              <input
                type="number"
                name="mtbf"
                value={metricas.mtbf}
                onChange={handleChange}
                placeholder="ej. 720 (30 días)"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">Recomendado: &gt;720 horas</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                MTTR - Tiempo Medio de Recuperación (minutos)
              </label>
              <input
                type="number"
                name="mttr"
                value={metricas.mttr}
                onChange={handleChange}
                placeholder="ej. 15"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">Objetivo: &lt;30 minutos</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Tiempo de Respuesta p95 (milisegundos)
              </label>
              <input
                type="number"
                name="tiempoRespuesta"
                value={metricas.tiempoRespuesta}
                onChange={handleChange}
                placeholder="ej. 200"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">Objetivo: &lt;300 ms</p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Complejidad Ciclomática Promedio
              </label>
              <input
                type="number"
                name="complejidad"
                value={metricas.complejidad}
                onChange={handleChange}
                placeholder="ej. 8"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">Recomendado: &lt;10</p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Cobertura de Pruebas (%)
              </label>
              <input
                type="number"
                name="coberturaPruebas"
                value={metricas.coberturaPruebas}
                onChange={handleChange}
                placeholder="ej. 85"
                min="0"
                max="100"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
              <p className="text-xs text-gray-500 mt-1">Objetivo: &gt;80%</p>
            </div>
          </div>

          <button
            onClick={calcularScore}
            className="mt-6 w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-bold py-4 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all transform hover:scale-[1.02] shadow-lg flex items-center justify-center space-x-2"
          >
            <Calculator className="w-5 h-5" />
            <span>Calcular Score de Calidad</span>
          </button>
        </div>

        {resultado && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <div className="text-center">
                <div className="inline-block p-4 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full mb-4">
                  <Award className="w-12 h-12 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Score de Calidad General</h2>
                <div className="text-7xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  {resultado.scoreGeneral}/100
                </div>
                <span className={`inline-block px-6 py-2 rounded-full font-bold text-lg ${getNivelColor(resultado.nivel)}`}>
                  {resultado.nivel}
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Análisis por Características ISO/IEC 25010
              </h3>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={resultado.datosRadar}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis 
                      dataKey="caracteristica" 
                      tick={{ fill: '#374151', fontSize: 12, fontWeight: 600 }}
                    />
                    <PolarRadiusAxis angle={90} domain={[0, 100]} />
                    <Radar 
                      name="Tu Proyecto" 
                      dataKey="valor" 
                      stroke="#4f46e5" 
                      fill="#4f46e5" 
                      fillOpacity={0.6} 
                    />
                    <Radar 
                      name="Benchmark Industria" 
                      dataKey="benchmark" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3} 
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <Lightbulb className="w-6 h-6 mr-2 text-yellow-500" />
                Recomendaciones de Mejora
              </h3>
              <div className="space-y-4">
                {resultado.recomendaciones.map((rec, idx) => {
                  const Icon = rec.tipo === 'success' ? CheckCircle : rec.tipo === 'error' ? AlertCircle : Info;
                  const colorClass = rec.tipo === 'success' ? 'bg-green-50 border-green-500 text-green-800' :
                                   rec.tipo === 'error' ? 'bg-red-50 border-red-500 text-red-800' :
                                   'bg-yellow-50 border-yellow-500 text-yellow-800';
                  
                  return (
                    <div key={idx} className={`border-l-4 p-4 rounded ${colorClass}`}>
                      <div className="flex items-start space-x-3">
                        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold">{rec.area}</p>
                          <p className="text-sm mt-1">{rec.mensaje}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// ==================== COMPONENTE PRINCIPAL APP ====================

const App = () => {
  const [perfilActivo, setPerfilActivo] = useState(null);
  const [vistaActual, setVistaActual] = useState('home');
  // Eliminados estados del chat Claude
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

  // Eliminada función enviarMensaje del chat Claude

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
                <h3 className="font-semibold">Calculadora de Métricas</h3>
                <p className="text-sm text-gray-300">Evalúa la calidad de tu software</p>
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

          <button
            onClick={() => setVistaActual('calculadora')}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all mb-6 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Calculator className="w-6 h-6" />
            <span>Calculadora de Métricas ISO/IEC 25010</span>
          </button>

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

  // Eliminado componente ChatAsistente del chat Claude

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
          <MapaCID />
          <div className="max-w-2xl mx-auto mt-10 mb-12 p-8 bg-white rounded-2xl shadow-xl flex flex-col items-center space-y-4 border-2 border-blue-100">
            <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Descarga recursos prácticos</h3>
            {(() => {
              // Detecta el base path de Vite según entorno
              const base = import.meta.env.BASE_URL || '/';
              return (
                <>
                  <a
                    href={`${base}estudio-caso-iso27001.pdf`}
                    download
                    className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition"
                  >
                    Download ISO 27001 Case Study (PDF)
                  </a>
                  <a
                    href={`${base}ISO IEC E ISO INTERNACIONAL Integración de Seguridad.pdf`}
                    download
                    className="inline-block px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow hover:bg-red-700 transition"
                  >
                    Download ISO/IEC International Security Integration (PDF)
                  </a>
                </>
              );
            })()}
          </div>
        </>
      )}

      {vistaActual === 'calculadora' && (
        <>
          <nav className="bg-white shadow-sm border-b">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <button
                onClick={() => setVistaActual('normas')}
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center space-x-2"
              >
                <span>← Volver a Normas</span>
              </button>
              <div className="flex items-center space-x-2">
                <Calculator className="w-5 h-5 text-gray-600" />
                <span className="text-gray-800 font-semibold">Calculadora de Métricas</span>
              </div>
            </div>
          </nav>
          <CalculadoraMetricas />
        </>
      )}

      {/* Eliminado ChatAsistente, ahora solo Botpress */}
    </div>
  );
};

export default App;