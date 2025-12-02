import React, { useState } from "react";

const Content = () => {
  const [activeTab, setActiveTab] = useState("voluntariado");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tabs = [
    { id: "voluntariado", name: "Voluntariado", icon: "🤝" },
    { id: "impacto", name: "Impacto Social", icon: "🌟" },
    { id: "dicas", name: "Dicas", icon: "💡" },
    { id: "recursos", name: "Recursos", icon: "📚" },
  ];

  const content = {
    voluntariado: [
      {
        title: "Como Começar no Voluntariado",
        description:
          "Guia completo para iniciantes que querem fazer a diferença",
        image: "🚀",
        category: "Iniciante",
        readTime: "5 min",
        fullContent: `
          <h2>Introdução ao Voluntariado</h2>
          <p>O voluntariado é uma das formas mais poderosas de contribuir para a sociedade. Se você está começando, este guia vai te ajudar a dar os primeiros passos de forma segura e eficaz.</p>
          
          <blockquote>
            "O voluntariado não é apenas sobre dar, é sobre receber. É uma troca que enriquece tanto quem ajuda quanto quem é ajudado."
          </blockquote>
          
          <h3>1. Identifique suas paixões</h3>
          <p>Antes de começar, reflita sobre as causas que mais te movem. Pode ser educação, meio ambiente, assistência social, ou qualquer outra área que desperte seu interesse genuíno.</p>
          
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>💡 Dica:</strong> Faça uma lista das causas que mais te tocam e pesquise organizações que trabalham nessas áreas.
          </div>
          
          <h3>2. Pesquise organizações</h3>
          <p>Procure ONGs e instituições que trabalham com as causas que você escolheu. Verifique se são organizações sérias, transparentes e que compartilham dos mesmos valores que você.</p>
          
          <h3>3. Comece pequeno</h3>
          <p>Você não precisa se comprometer com muitas horas por semana. Comece com algumas horas e vá aumentando gradualmente conforme se sentir confortável e disponível.</p>
          
          <h3>4. Seja consistente</h3>
          <p>A consistência é mais importante que a quantidade. É melhor dedicar 2 horas por semana regularmente do que 10 horas uma vez por mês. A regularidade cria confiança e permite um impacto mais duradouro.</p>
          
          <h3>5. Aprenda continuamente</h3>
          <p>O voluntariado é uma via de mão dupla. Você contribui com seu tempo e habilidades, mas também aprende muito com a experiência, desenvolvendo novas competências e conhecendo realidades diferentes.</p>
          
          <div style="background: #d1fae5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <strong>✅ Lembre-se:</strong> O voluntariado deve ser uma experiência positiva e enriquecedora tanto para você quanto para quem você está ajudando. Se não estiver se sentindo bem, é importante repensar sua abordagem ou escolher uma causa diferente.
          </div>
        `,
        author: "Maria Santos",
        authorRole: "Coordenadora de Voluntariado",
        publishDate: "15 de Janeiro, 2024",
      },
      {
        title: "Voluntariado Corporativo",
        description:
          "Como empresas podem envolver seus colaboradores em causas sociais",
        image: "🏢",
        category: "Empresas",
        readTime: "8 min",
        fullContent: `
          <h2>Voluntariado Corporativo: Benefícios para Todos</h2>
          <p>O voluntariado corporativo é uma estratégia que beneficia empresas, funcionários e a comunidade. Descubra como implementar essa prática na sua organização.</p>
          
          <h3>Benefícios para a Empresa</h3>
          <ul>
            <li>Melhora a imagem da marca</li>
            <li>Aumenta o engajamento dos funcionários</li>
            <li>Desenvolve habilidades de liderança</li>
            <li>Fortalece o senso de propósito</li>
          </ul>
          
          <h3>Benefícios para os Funcionários</h3>
          <ul>
            <li>Desenvolvimento pessoal e profissional</li>
            <li>Networking com outros voluntários</li>
            <li>Senso de realização e propósito</li>
            <li>Melhoria do bem-estar mental</li>
          </ul>
          
          <h3>Como Implementar</h3>
          <p>1. Defina objetivos claros<br>
          2. Escolha causas alinhadas com os valores da empresa<br>
          3. Ofereça flexibilidade de horários<br>
          4. Reconheça e celebre as contribuições<br>
          5. Meça o impacto das ações</p>
          
          <p><strong>Dica:</strong> Comece com projetos pequenos e vá expandindo conforme a adesão dos funcionários.</p>
        `,
        author: "Carlos Mendes",
        authorRole: "Especialista em Responsabilidade Social",
        publishDate: "22 de Janeiro, 2024",
      },
      {
        title: "Voluntariado Virtual",
        description: "Oportunidades de ajudar sem sair de casa",
        image: "💻",
        category: "Tecnologia",
        readTime: "6 min",
        fullContent: `
          <h2>Voluntariado Virtual: Ajudando de Qualquer Lugar</h2>
          <p>O voluntariado virtual democratiza a participação social, permitindo que pessoas de qualquer lugar do mundo contribuam para causas importantes.</p>
          
          <h3>Tipos de Voluntariado Virtual</h3>
          <ul>
            <li><strong>Tradução:</strong> Traduzir documentos e materiais</li>
            <li><strong>Design:</strong> Criar materiais gráficos e visuais</li>
            <li><strong>Programação:</strong> Desenvolver sites e aplicativos</li>
            <li><strong>Mentoria:</strong> Orientar jovens e profissionais</li>
            <li><strong>Pesquisa:</strong> Coletar e analisar dados</li>
            <li><strong>Redação:</strong> Escrever conteúdos e materiais</li>
          </ul>
          
          <h3>Vantagens do Voluntariado Virtual</h3>
          <ul>
            <li>Flexibilidade de horários</li>
            <li>Sem deslocamento</li>
            <li>Menor custo</li>
            <li>Maior alcance geográfico</li>
            <li>Diversidade de habilidades</li>
          </ul>
          
          <h3>Como Começar</h3>
          <p>1. Identifique suas habilidades<br>
          2. Pesquise plataformas de voluntariado virtual<br>
          3. Crie um perfil detalhado<br>
          4. Participe de projetos pequenos inicialmente<br>
          5. Mantenha comunicação regular</p>
          
          <p><strong>Plataformas recomendadas:</strong> Catchafire, Taproot, UN Volunteers Online</p>
        `,
        author: "Ana Costa",
        authorRole: "Especialista em Voluntariado Digital",
        publishDate: "28 de Janeiro, 2024",
      },
    ],
    impacto: [
      {
        title: "Histórias de Transformação",
        description: "Relatos reais de como o voluntariado mudou vidas",
        image: "❤️",
        category: "Inspiração",
        readTime: "10 min",
        fullContent: `
          <h2>Histórias que Inspiram: O Poder Transformador do Voluntariado</h2>
          <p>Conheça histórias reais de pessoas que transformaram suas vidas e a vida de outros através do voluntariado. Cada relato mostra como pequenas ações podem gerar grandes mudanças.</p>
          
          <blockquote>
            "O voluntariado é a linguagem universal que conecta corações e transforma vidas."
          </blockquote>
          
          <h3>👩 Maria, 45 anos - Voluntária em Creche Comunitária</h3>
          <div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b; margin: 20px 0; font-style: italic;">
            "Comecei a voluntariar na creche do meu bairro após me aposentar. O que começou como uma forma de ocupar o tempo se tornou minha paixão. Ver o sorriso das crianças e saber que estou contribuindo para seu desenvolvimento me enche de alegria. Hoje coordeno um grupo de 15 voluntários e nossa creche atende 80 crianças."
          </div>
          
          <h3>👨 João, 28 anos - Mentor de Jovens</h3>
          <div style="background: #dbeafe; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6; margin: 20px 0; font-style: italic;">
            "Sou engenheiro e sempre quis compartilhar meu conhecimento. Comecei a mentorar jovens de comunidades carentes em programação. Um dos meus mentorados conseguiu uma vaga em uma grande empresa de tecnologia. Ver o impacto que tive na vida dele me mostrou o poder da educação e do voluntariado."
          </div>
          
          <h3>👩 Ana, 35 anos - Voluntária em Abrigo de Animais</h3>
          <div style="background: #fce7f3; padding: 20px; border-radius: 12px; border-left: 4px solid #ec4899; margin: 20px 0; font-style: italic;">
            "Sempre amei animais e decidi ajudar em um abrigo local. Além de cuidar dos animais, organizo eventos de adoção e campanhas de conscientização. Já ajudei mais de 200 animais a encontrarem um lar. O voluntariado me ensinou sobre compaixão e responsabilidade social."
          </div>
          
          <h3>👨 Carlos, 60 anos - Voluntário em Hospital</h3>
          <div style="background: #d1fae5; padding: 20px; border-radius: 12px; border-left: 4px solid #10b981; margin: 20px 0; font-style: italic;">
            "Após me recuperar de uma cirurgia, decidi retribuir o cuidado que recebi. Voluntario no hospital onde fui tratado, visitando pacientes e oferecendo apoio emocional. Muitos pacientes me agradecem por trazer esperança em momentos difíceis."
          </div>
          
          <h3>🌟 O Impacto Duplo do Voluntariado</h3>
          <p>Essas histórias mostram que o voluntariado é uma via de mão dupla: quem ajuda também é ajudado. Os voluntários desenvolvem habilidades e experiências valiosas:</p>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border: 2px solid #e2e8f0; margin: 20px 0;">
            <ul style="margin: 0; padding-left: 20px;">
              <li><strong>🎯 Maior senso de propósito:</strong> Encontrar significado em suas ações</li>
              <li><strong>🤝 Habilidades interpessoais:</strong> Melhorar comunicação e empatia</li>
              <li><strong>🧠 Bem-estar mental:</strong> Reduzir estresse e ansiedade</li>
              <li><strong>👥 Networking e amizades:</strong> Conhecer pessoas com valores similares</li>
              <li><strong>💼 Experiência profissional:</strong> Desenvolver competências transferíveis</li>
            </ul>
          </div>
          
          <h3>🚀 Como Começar Sua Própria História</h3>
          <p>Se você se inspirou com essas histórias, saiba que é possível começar sua própria jornada de voluntariado. Comece identificando suas paixões e habilidades, depois procure organizações que precisam de ajuda na sua área.</p>
          
          <div style="background: #fef3c7; padding: 20px; border-radius: 12px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>💡 Lembre-se:</strong> Cada pequena ação pode gerar grandes transformações. Sua história de voluntariado pode ser a próxima a inspirar outras pessoas a fazerem a diferença!
          </div>
        `,
        author: "Equipe Editorial",
        authorRole: "Jornalistas Sociais",
        publishDate: "5 de Fevereiro, 2024",
      },
      {
        title: "Métricas de Impacto",
        description:
          "Como medir e demonstrar o impacto do seu trabalho voluntário",
        image: "📊",
        category: "Análise",
        readTime: "7 min",
        fullContent: `
          <h2>Medindo o Impacto do Voluntariado</h2>
          <p>Saber medir o impacto do seu trabalho voluntário é essencial para demonstrar o valor das ações realizadas e para melhorar continuamente os projetos. Métricas bem definidas ajudam a comunicar resultados e a atrair mais apoio para as causas.</p>
          
          <blockquote>
            "O que não é medido, não pode ser melhorado. O que não é melhorado, sempre se deteriora."
          </blockquote>
          
          <h3>1. Tipos de Métricas</h3>
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>📈 Métricas Quantitativas:</strong> Números que podem ser contados e medidos objetivamente.
          </div>
          
          <ul>
            <li><strong>Número de beneficiários atendidos</strong> - Quantas pessoas foram impactadas</li>
            <li><strong>Horas de voluntariado</strong> - Tempo dedicado às atividades</li>
            <li><strong>Recursos arrecadados</strong> - Valor em dinheiro ou materiais</li>
            <li><strong>Eventos realizados</strong> - Quantidade de ações executadas</li>
            <li><strong>Voluntários envolvidos</strong> - Número de pessoas participando</li>
          </ul>
          
          <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <strong>💭 Métricas Qualitativas:</strong> Avaliações subjetivas sobre a qualidade do impacto.
          </div>
          
          <ul>
            <li><strong>Depoimentos e feedback</strong> - Relatos dos beneficiários</li>
            <li><strong>Mudanças comportamentais</strong> - Transformações observadas</li>
            <li><strong>Satisfação dos voluntários</strong> - Como se sentem com o trabalho</li>
            <li><strong>Melhoria na qualidade de vida</strong> - Impacto na vida das pessoas</li>
          </ul>
          
          <h3>2. Como Coletar Dados</h3>
          <p>Para medir o impacto efetivamente, é importante ter um sistema de coleta de dados:</p>
          
          <h4>📋 Ferramentas de Coleta:</h4>
          <ul>
            <li><strong>Formulários de registro</strong> - Para dados básicos dos beneficiários</li>
            <li><strong>Pesquisas de satisfação</strong> - Feedback regular dos participantes</li>
            <li><strong>Relatórios de atividades</strong> - Registro detalhado das ações</li>
            <li><strong>Fotografias e vídeos</strong> - Evidências visuais do impacto</li>
            <li><strong>Entrevistas</strong> - Conversas aprofundadas com beneficiários</li>
          </ul>
          
          <h3>3. Indicadores de Sucesso</h3>
          <p>Defina indicadores claros que demonstrem se os objetivos estão sendo alcançados:</p>
          
          <div style="background: #d1fae5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <strong>✅ Exemplos de Indicadores:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>Taxa de conclusão de cursos oferecidos</li>
              <li>Melhoria nas notas escolares dos alunos atendidos</li>
              <li>Redução do número de animais abandonados</li>
              <li>Aumento da conscientização ambiental na comunidade</li>
            </ul>
          </div>
          
          <h3>4. Relatórios de Impacto</h3>
          <p>Crie relatórios regulares que comuniquem os resultados de forma clara e atrativa:</p>
          
          <ul>
            <li><strong>Relatórios mensais</strong> - Acompanhamento regular das atividades</li>
            <li><strong>Relatórios anuais</strong> - Visão geral do impacto anual</li>
            <li><strong>Relatórios temáticos</strong> - Foco em projetos específicos</li>
            <li><strong>Relatórios para doadores</strong> - Demonstração do uso dos recursos</li>
          </ul>
          
          <h3>5. Tecnologia para Medição</h3>
          <p>Utilize ferramentas tecnológicas para facilitar a coleta e análise de dados:</p>
          
          <ul>
            <li><strong>Planilhas eletrônicas</strong> - Google Sheets, Excel</li>
            <li><strong>Formulários online</strong> - Google Forms, Typeform</li>
            <li><strong>Apps de voluntariado</strong> - Plataformas especializadas</li>
            <li><strong>Redes sociais</strong> - Para compartilhar resultados</li>
          </ul>
          
          <div style="background: #fce7f3; padding: 16px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 20px 0;">
            <strong>💡 Dica:</strong> Comece simples! Não é necessário um sistema complexo desde o início. O importante é começar a medir e melhorar gradualmente o processo de coleta de dados.
          </div>
          
          <h3>6. Comunicação dos Resultados</h3>
          <p>Comunique os resultados de forma atrativa e compreensível:</p>
          
          <ul>
            <li><strong>Infográficos</strong> - Visualizações atrativas dos dados</li>
            <li><strong>Histórias de impacto</strong> - Casos reais de transformação</li>
            <li><strong>Vídeos</strong> - Depoimentos e registros visuais</li>
            <li><strong>Relatórios executivos</strong> - Resumos para tomadores de decisão</li>
          </ul>
          
          <p><strong>Lembre-se:</strong> Medir o impacto não é apenas sobre números, mas sobre demonstrar como o voluntariado está realmente transformando vidas e comunidades. Use as métricas para contar histórias poderosas de mudança!</p>
        `,
      },
      {
        title: "Voluntariado Sustentável",
        description: "Criando mudanças duradouras na comunidade",
        image: "🌱",
        category: "Sustentabilidade",
        readTime: "9 min",
        fullContent: `
          <h2>Voluntariado Sustentável: Mudanças que Perduram</h2>
          <p>O voluntariado sustentável vai além de ações pontuais. É sobre criar transformações duradouras que continuam gerando impacto mesmo após o término do projeto. Descubra como desenvolver projetos que realmente fazem a diferença a longo prazo.</p>
          
          <blockquote>
            "O voluntariado sustentável não é sobre dar um peixe, mas ensinar a pescar e garantir que o rio continue cheio de peixes."
          </blockquote>
          
          <h3>1. Princípios do Voluntariado Sustentável</h3>
          <div style="background: #d1fae5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <strong>🌱 Características Essenciais:</strong>
          </div>
          
          <ul>
            <li><strong>Empoderamento da comunidade</strong> - Capacitar pessoas para resolverem seus próprios problemas</li>
            <li><strong>Transferência de conhecimento</strong> - Ensinar habilidades que permanecem</li>
            <li><strong>Participação ativa</strong> - Envolver beneficiários no planejamento e execução</li>
            <li><strong>Continuidade</strong> - Projetos que se mantêm após a saída dos voluntários</li>
            <li><strong>Impacto multiplicador</strong> - Ações que geram outras ações positivas</li>
          </ul>
          
          <h3>2. Planejamento para Sustentabilidade</h3>
          <p>Um projeto sustentável começa com um planejamento cuidadoso:</p>
          
          <h4>📋 Fases do Planejamento:</h4>
          <ul>
            <li><strong>Diagnóstico participativo</strong> - Entender as necessidades reais da comunidade</li>
            <li><strong>Definição de objetivos claros</strong> - Metas específicas e mensuráveis</li>
            <li><strong>Identificação de recursos locais</strong> - Aproveitar o que já existe</li>
            <li><strong>Plano de saída</strong> - Como o projeto continuará sem os voluntários</li>
            <li><strong>Monitoramento e avaliação</strong> - Acompanhar o progresso</li>
          </ul>
          
          <h3>3. Estratégias de Sustentabilidade</h3>
          
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>🎯 Estratégias Eficazes:</strong>
          </div>
          
          <h4>Capacitação e Treinamento:</h4>
          <ul>
            <li>Formar multiplicadores locais</li>
            <li>Criar materiais educativos permanentes</li>
            <li>Estabelecer programas de mentoria</li>
            <li>Desenvolver habilidades técnicas e sociais</li>
          </ul>
          
          <h4>Estruturação Institucional:</h4>
          <ul>
            <li>Fortalecer organizações locais</li>
            <li>Criar redes de apoio</li>
            <li>Estabelecer parcerias duradouras</li>
            <li>Desenvolver lideranças comunitárias</li>
          </ul>
          
          <h4>Geração de Recursos:</h4>
          <ul>
            <li>Ensinar técnicas de captação de recursos</li>
            <li>Criar fontes de renda locais</li>
            <li>Desenvolver produtos ou serviços sustentáveis</li>
            <li>Estabelecer parcerias comerciais</li>
          </ul>
          
          <h3>4. Exemplos de Projetos Sustentáveis</h3>
          
          <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <strong>💡 Casos de Sucesso:</strong>
          </div>
          
          <h4>🌱 Projeto de Horta Comunitária:</h4>
          <ul>
            <li>Capacitação em técnicas de cultivo orgânico</li>
            <li>Criação de uma cooperativa de produtores</li>
            <li>Estabelecimento de pontos de venda</li>
            <li>Formação de multiplicadores locais</li>
          </ul>
          
          <h4>📚 Biblioteca Comunitária:</h4>
          <ul>
            <li>Treinamento de bibliotecários voluntários</li>
            <li>Criação de programas de leitura</li>
            <li>Estabelecimento de parcerias com escolas</li>
            <li>Sistema de doações e renovação de acervo</li>
          </ul>
          
          <h4>💻 Centro de Inclusão Digital:</h4>
          <ul>
            <li>Formação de instrutores locais</li>
            <li>Criação de cursos regulares</li>
            <li>Parcerias com empresas de tecnologia</li>
            <li>Programa de manutenção de equipamentos</li>
          </ul>
          
          <h3>5. Desafios e Soluções</h3>
          <p>Projetos sustentáveis enfrentam desafios específicos:</p>
          
          <div style="background: #fce7f3; padding: 16px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 20px 0;">
            <strong>⚠️ Desafios Comuns:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>Falta de recursos financeiros contínuos</li>
              <li>Dificuldade em manter voluntários engajados</li>
              <li>Resistência à mudança na comunidade</li>
              <li>Falta de liderança local</li>
            </ul>
          </div>
          
          <h4>🔧 Soluções:</h4>
          <ul>
            <li><strong>Diversificação de recursos</strong> - Múltiplas fontes de financiamento</li>
            <li><strong>Rotatividade de voluntários</strong> - Sistema de renovação contínua</li>
            <li><strong>Comunicação constante</strong> - Manter a comunidade informada</li>
            <li><strong>Desenvolvimento de lideranças</strong> - Identificar e formar líderes locais</li>
          </ul>
          
          <h3>6. Medindo a Sustentabilidade</h3>
          <p>Como saber se um projeto é realmente sustentável:</p>
          
          <ul>
            <li><strong>Continuidade das atividades</strong> - Projeto continua após saída dos voluntários</li>
            <li><strong>Autonomia da comunidade</strong> - Pessoas resolvem problemas sozinhas</li>
            <li><strong>Multiplicação do conhecimento</strong> - Beneficiários ensinam outros</li>
            <li><strong>Geração de recursos próprios</strong> - Projeto se sustenta financeiramente</li>
            <li><strong>Melhoria contínua</strong> - Projeto evolui e se adapta</li>
          </ul>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 2px solid #e2e8f0; margin: 20px 0;">
            <strong>🎯 Checklist de Sustentabilidade:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>✅ Comunidade participa ativamente do projeto</li>
              <li>✅ Existem líderes locais capacitados</li>
              <li>✅ Há fontes de recursos próprios</li>
              <li>✅ Conhecimento foi transferido</li>
              <li>✅ Projeto tem plano de continuidade</li>
            </ul>
          </div>
          
          <h3>7. Dicas para Voluntários</h3>
          <p>Como contribuir para projetos sustentáveis:</p>
          
          <ul>
            <li><strong>Escute mais do que fale</strong> - Entenda as necessidades reais</li>
            <li><strong>Capacite, não apenas faça</strong> - Ensine habilidades</li>
            <li><strong>Respeite a cultura local</strong> - Adapte-se ao contexto</li>
            <li><strong>Pense a longo prazo</strong> - Considere o futuro do projeto</li>
            <li><strong>Construa relacionamentos</strong> - Crie laços duradouros</li>
          </ul>
          
          <p><strong>Lembre-se:</strong> O voluntariado sustentável é sobre criar legados. Cada ação deve contribuir para um futuro melhor, onde a comunidade continue se desenvolvendo mesmo sem a presença constante dos voluntários. É sobre plantar sementes que crescerão e darão frutos por muitos anos!</p>
        `,
      },
    ],
    dicas: [
      {
        title: "Organizando uma Ação Social",
        description:
          "Passo a passo para planejar e executar projetos voluntários",
        image: "📋",
        category: "Planejamento",
        readTime: "12 min",
        fullContent: `
          <h2>Organizando uma Ação Social: Guia Completo</h2>
          <p>Organizar uma ação social bem-sucedida requer planejamento, dedicação e atenção aos detalhes. Este guia completo vai te ajudar a criar projetos que realmente fazem a diferença na comunidade, desde a concepção até a avaliação final.</p>
          
          <blockquote>
            "Uma ação social bem planejada é como uma semente plantada com cuidado: tem muito mais chances de crescer e dar frutos."
          </blockquote>
          
          <h3>1. Fase de Planejamento</h3>
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>📋 Planejamento é Fundamental:</strong> Dedique tempo suficiente para planejar antes de executar.
          </div>
          
          <h4>Definição do Problema:</h4>
          <ul>
            <li><strong>Identifique a necessidade real</strong> - Converse com a comunidade</li>
            <li><strong>Pesquise dados</strong> - Entenda a dimensão do problema</li>
            <li><strong>Defina o público-alvo</strong> - Quem será beneficiado</li>
            <li><strong>Estabeleça prioridades</strong> - O que é mais urgente</li>
          </ul>
          
          <h4>Definição de Objetivos:</h4>
          <ul>
            <li><strong>Objetivo geral</strong> - O que se quer alcançar no longo prazo</li>
            <li><strong>Objetivos específicos</strong> - Metas concretas e mensuráveis</li>
            <li><strong>Resultados esperados</strong> - O que mudará após a ação</li>
            <li><strong>Indicadores de sucesso</strong> - Como medir o impacto</li>
          </ul>
          
          <h3>2. Estruturação da Equipe</h3>
          <p>Uma equipe bem organizada é essencial para o sucesso:</p>
          
          <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <strong>👥 Papéis Importantes:</strong>
          </div>
          
          <ul>
            <li><strong>Coordenador geral</strong> - Liderança e tomada de decisões</li>
            <li><strong>Coordenador de logística</strong> - Materiais, transporte, local</li>
            <li><strong>Coordenador de comunicação</strong> - Divulgação e relacionamento</li>
            <li><strong>Coordenador de voluntários</strong> - Recrutamento e treinamento</li>
            <li><strong>Coordenador financeiro</strong> - Orçamento e recursos</li>
          </ul>
          
          <h3>3. Cronograma e Cronologia</h3>
          <p>Organize o tempo de forma eficiente:</p>
          
          <h4>📅 Fases do Projeto:</h4>
          <ul>
            <li><strong>Pré-projeto (2-4 semanas)</strong> - Planejamento detalhado</li>
            <li><strong>Preparação (1-2 semanas)</strong> - Recrutamento e treinamento</li>
            <li><strong>Execução (1-7 dias)</strong> - Realização da ação</li>
            <li><strong>Pós-projeto (1-2 semanas)</strong> - Avaliação e relatórios</li>
          </ul>
          
          <h3>4. Recursos Necessários</h3>
          <p>Identifique e organize todos os recursos:</p>
          
          <div style="background: #d1fae5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <strong>💰 Recursos Financeiros:</strong>
          </div>
          <ul>
            <li>Orçamento detalhado</li>
            <li>Fontes de financiamento</li>
            <li>Controle de gastos</li>
            <li>Prestação de contas</li>
          </ul>
          
          <div style="background: #fce7f3; padding: 16px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 20px 0;">
            <strong>🛠️ Recursos Materiais:</strong>
          </div>
          <ul>
            <li>Materiais de consumo</li>
            <li>Equipamentos necessários</li>
            <li>Local adequado</li>
            <li>Transporte</li>
          </ul>
          
          <div style="background: #f3e8ff; padding: 16px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
            <strong>👥 Recursos Humanos:</strong>
          </div>
          <ul>
            <li>Voluntários qualificados</li>
            <li>Especialistas quando necessário</li>
            <li>Liderança local</li>
            <li>Parceiros estratégicos</li>
          </ul>
          
          <h3>5. Execução da Ação</h3>
          <p>O momento da execução requer organização e flexibilidade:</p>
          
          <h4>🎯 Dia da Ação:</h4>
          <ul>
            <li><strong>Chegada antecipada</strong> - Prepare tudo com antecedência</li>
            <li><strong>Briefing da equipe</strong> - Alinhamento final</li>
            <li><strong>Recepção dos beneficiários</strong> - Ambiente acolhedor</li>
            <li><strong>Execução das atividades</strong> - Seguindo o planejado</li>
            <li><strong>Monitoramento contínuo</strong> - Ajustes quando necessário</li>
            <li><strong>Encerramento</strong> - Agradecimentos e próximos passos</li>
          </ul>
          
          <h3>6. Comunicação e Divulgação</h3>
          <p>Uma boa comunicação é essencial para o sucesso:</p>
          
          <h4>📢 Estratégias de Divulgação:</h4>
          <ul>
            <li><strong>Redes sociais</strong> - Facebook, Instagram, WhatsApp</li>
            <li><strong>Mídia local</strong> - Rádio, jornal, TV</li>
            <li><strong>Parcerias</strong> - Escolas, igrejas, associações</li>
            <li><strong>Material impresso</strong> - Cartazes, panfletos</li>
            <li><strong>Boca a boca</strong> - Mobilização comunitária</li>
          </ul>
          
          <h3>7. Gestão de Riscos</h3>
          <p>Antecipe e prepare-se para possíveis problemas:</p>
          
          <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
            <strong>⚠️ Riscos Comuns:</strong>
          </div>
          <ul>
            <li><strong>Clima adverso</strong> - Tenha plano B para atividades externas</li>
            <li><strong>Falta de voluntários</strong> - Recrute mais do que o necessário</li>
            <li><strong>Problemas de transporte</strong> - Organize caronas e transporte alternativo</li>
            <li><strong>Falta de materiais</strong> - Tenha estoque extra</li>
            <li><strong>Baixa adesão</strong> - Divulgue amplamente e crie incentivos</li>
          </ul>
          
          <h3>8. Avaliação e Aprendizado</h3>
          <p>Avalie o projeto para melhorar futuras ações:</p>
          
          <h4>📊 Métodos de Avaliação:</h4>
          <ul>
            <li><strong>Pesquisas de satisfação</strong> - Feedback dos beneficiários</li>
            <li><strong>Reunião de avaliação</strong> - Discussão com a equipe</li>
            <li><strong>Relatório de atividades</strong> - Documentação dos resultados</li>
            <li><strong>Análise de indicadores</strong> - Comparação com metas</li>
          </ul>
          
          <h3>9. Sustentabilidade e Continuidade</h3>
          <p>Pense em como dar continuidade ao projeto:</p>
          
          <ul>
            <li><strong>Formação de multiplicadores</strong> - Capacite líderes locais</li>
            <li><strong>Parcerias duradouras</strong> - Estabeleça relações permanentes</li>
            <li><strong>Fontes de recursos</strong> - Crie mecanismos de financiamento</li>
            <li><strong>Plano de continuidade</strong> - Como o projeto seguirá</li>
          </ul>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 2px solid #e2e8f0; margin: 20px 0;">
            <strong>✅ Checklist Final:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>✅ Problema identificado e pesquisado</li>
              <li>✅ Objetivos claros e mensuráveis</li>
              <li>✅ Equipe organizada e treinada</li>
              <li>✅ Cronograma detalhado</li>
              <li>✅ Recursos garantidos</li>
              <li>✅ Comunicação planejada</li>
              <li>✅ Riscos mapeados</li>
              <li>✅ Avaliação programada</li>
            </ul>
          </div>
          
          <p><strong>Lembre-se:</strong> Organizar uma ação social é um processo de aprendizado contínuo. Cada projeto te ensina algo novo e te prepara melhor para o próximo. O importante é começar, mesmo que não seja perfeito, e ir melhorando a cada nova ação!</p>
        `,
      },
      {
        title: "Comunicação Efetiva",
        description:
          "Como se comunicar melhor com beneficiários e outros voluntários",
        image: "🗣️",
        category: "Comunicação",
        readTime: "6 min",
        fullContent: `
          <h2>Comunicação Efetiva no Voluntariado</h2>
          <p>A comunicação é a base de qualquer trabalho voluntário bem-sucedido. Saber se comunicar de forma clara, empática e respeitosa é essencial para construir relacionamentos sólidos e garantir que as ações tenham o impacto desejado.</p>
          
          <blockquote>
            "A comunicação efetiva não é apenas sobre falar bem, mas sobre criar conexões genuínas que transformam vidas."
          </blockquote>
          
          <h3>1. Princípios da Comunicação Efetiva</h3>
          <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <strong>🗣️ Fundamentos Essenciais:</strong>
          </div>
          
          <ul>
            <li><strong>Empatia</strong> - Colocar-se no lugar do outro</li>
            <li><strong>Respeito</strong> - Valorizar diferentes perspectivas</li>
            <li><strong>Clareza</strong> - Ser objetivo e compreensível</li>
            <li><strong>Autenticidade</strong> - Ser genuíno e transparente</li>
            <li><strong>Paciência</strong> - Dar tempo para compreensão</li>
          </ul>
          
          <h3>2. Comunicação com Beneficiários</h3>
          <p>Comunicar-se com quem você está ajudando requer sensibilidade especial:</p>
          
          <h4>🎯 Estratégias Importantes:</h4>
          <ul>
            <li><strong>Escute ativamente</strong> - Preste atenção total ao que é dito</li>
            <li><strong>Use linguagem simples</strong> - Evite jargões e termos técnicos</li>
            <li><strong>Seja paciente</strong> - Dê tempo para processar informações</li>
            <li><strong>Valide sentimentos</strong> - Reconheça emoções e experiências</li>
            <li><strong>Mantenha confidencialidade</strong> - Respeite a privacidade</li>
          </ul>
          
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>💡 Dicas Práticas:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>Faça perguntas abertas para entender melhor</li>
              <li>Use exemplos concretos e familiares</li>
              <li>Confirme se a mensagem foi compreendida</li>
              <li>Seja consistente nas informações</li>
            </ul>
          </div>
          
          <h3>3. Comunicação com Outros Voluntários</h3>
          <p>Trabalhar em equipe requer comunicação eficiente:</p>
          
          <h4>👥 Dinâmicas de Equipe:</h4>
          <ul>
            <li><strong>Briefings regulares</strong> - Alinhamento constante</li>
            <li><strong>Feedback construtivo</strong> - Críticas produtivas</li>
            <li><strong>Reconhecimento</strong> - Valorizar contribuições</li>
            <li><strong>Resolução de conflitos</strong> - Abordar problemas abertamente</li>
            <li><strong>Compartilhamento de informações</strong> - Manter todos informados</li>
          </ul>
          
          <h3>4. Comunicação Não-Verbal</h3>
          <p>Muitas vezes, o que não dizemos é tão importante quanto o que dizemos:</p>
          
          <div style="background: #d1fae5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <strong>👀 Elementos Não-Verbais:</strong>
          </div>
          
          <ul>
            <li><strong>Linguagem corporal</strong> - Postura, gestos, movimentos</li>
            <li><strong>Contato visual</strong> - Olhar nos olhos com respeito</li>
            <li><strong>Tom de voz</strong> - Entonação adequada</li>
            <li><strong>Expressões faciais</strong> - Sorrisos, caras de preocupação</li>
            <li><strong>Proximidade física</strong> - Respeitar espaço pessoal</li>
          </ul>
          
          <h3>5. Comunicação em Diferentes Contextos</h3>
          <p>Adapte sua comunicação ao contexto específico:</p>
          
          <h4>🏥 Contextos Específicos:</h4>
          <ul>
            <li><strong>Ambientes de saúde</strong> - Sensibilidade e discrição</li>
            <li><strong>Educação</strong> - Linguagem didática e motivadora</li>
            <li><strong>Assistência social</strong> - Empatia e acolhimento</li>
            <li><strong>Meio ambiente</strong> - Conscientização e educação</li>
            <li><strong>Emergências</strong> - Clareza e objetividade</li>
          </ul>
          
          <h3>6. Barreiras de Comunicação</h3>
          <p>Identifique e supere obstáculos comuns:</p>
          
          <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
            <strong>⚠️ Barreiras Comuns:</strong>
          </div>
          
          <ul>
            <li><strong>Diferenças culturais</strong> - Valores e costumes diversos</li>
            <li><strong>Diferenças de idade</strong> - Gerações diferentes</li>
            <li><strong>Diferenças socioeconômicas</strong> - Realidades distintas</li>
            <li><strong>Preconceitos</strong> - Julgamentos prévios</li>
            <li><strong>Estresse emocional</strong> - Situações difíceis</li>
          </ul>
          
          <h4>🔧 Como Superar:</h4>
          <ul>
            <li>Pesquise sobre a cultura local</li>
            <li>Seja humilde e aberto ao aprendizado</li>
            <li>Questione seus próprios preconceitos</li>
            <li>Pratique a escuta ativa</li>
            <li>Peça feedback sobre sua comunicação</li>
          </ul>
          
          <h3>7. Ferramentas de Comunicação</h3>
          <p>Utilize diferentes canais para se comunicar efetivamente:</p>
          
          <h4>📱 Canais Digitais:</h4>
          <ul>
            <li><strong>WhatsApp</strong> - Comunicação rápida e direta</li>
            <li><strong>Email</strong> - Informações formais e detalhadas</li>
            <li><strong>Redes sociais</strong> - Divulgação e engajamento</li>
            <li><strong>Videoconferências</strong> - Reuniões à distância</li>
          </ul>
          
          <h4>📢 Canais Tradicionais:</h4>
          <ul>
            <li><strong>Reuniões presenciais</strong> - Interação direta</li>
            <li><strong>Material impresso</strong> - Informações permanentes</li>
            <li><strong>Rádio comunitária</strong> - Alcance local</li>
            <li><strong>Boca a boca</strong> - Confiança e credibilidade</li>
          </ul>
          
          <h3>8. Comunicação em Situações Difíceis</h3>
          <p>Algumas situações requerem comunicação especial:</p>
          
          <div style="background: #fce7f3; padding: 16px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 20px 0;">
            <strong>💪 Situações Desafiadoras:</strong>
          </div>
          
          <ul>
            <li><strong>Dar más notícias</strong> - Seja direto, mas empático</li>
            <li><strong>Mediar conflitos</strong> - Mantenha neutralidade</li>
            <li><strong>Negar pedidos</strong> - Explique o motivo</li>
            <li><strong>Corrigir erros</strong> - Foque na solução</li>
            <li><strong>Lidar com emoções</strong> - Valide sentimentos</li>
          </ul>
          
          <h3>9. Desenvolvendo Habilidades de Comunicação</h3>
          <p>Melhore continuamente sua comunicação:</p>
          
          <h4>📚 Formas de Aprendizado:</h4>
          <ul>
            <li><strong>Prática constante</strong> - Use em situações reais</li>
            <li><strong>Feedback regular</strong> - Peça opiniões</li>
            <li><strong>Observação</strong> - Aprenda com outros</li>
            <li><strong>Leitura</strong> - Livros sobre comunicação</li>
            <li><strong>Cursos</strong> - Treinamentos específicos</li>
          </ul>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 2px solid #e2e8f0; margin: 20px 0;">
            <strong>✅ Checklist de Comunicação Efetiva:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>✅ Escutei ativamente o que foi dito</li>
              <li>✅ Usei linguagem clara e apropriada</li>
              <li>✅ Mantive contato visual respeitoso</li>
              <li>✅ Validei os sentimentos da pessoa</li>
              <li>✅ Confirmei se fui compreendido</li>
              <li>✅ Mantive confidencialidade quando necessário</li>
            </ul>
          </div>
          
          <p><strong>Lembre-se:</strong> A comunicação efetiva é uma habilidade que se desenvolve com prática e reflexão. Cada interação é uma oportunidade de aprender e melhorar. O mais importante é sempre manter o respeito, a empatia e a genuína vontade de ajudar!</p>
        `,
      },
      {
        title: "Cuidando da Saúde Mental",
        description:
          "Dicas para manter o bem-estar durante o trabalho voluntário",
        image: "🧠",
        category: "Saúde",
        readTime: "8 min",
        fullContent: `
          <h2>Cuidando da Saúde Mental no Voluntariado</h2>
          <p>O trabalho voluntário pode ser extremamente gratificante, mas também pode ser emocionalmente desafiador. Cuidar da sua saúde mental é essencial para manter o bem-estar e continuar fazendo a diferença de forma sustentável.</p>
          
          <blockquote>
            "Você não pode derramar de um copo vazio. Cuidar de si mesmo não é egoísmo, é uma necessidade para poder cuidar dos outros."
          </blockquote>
          
          <h3>1. Reconhecendo os Sinais de Desgaste</h3>
          <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
            <strong>⚠️ Sinais de Alerta:</strong>
          </div>
          
          <ul>
            <li><strong>Esgotamento emocional</strong> - Sentir-se constantemente cansado</li>
            <li><strong>Irritabilidade</strong> - Ficar facilmente irritado ou frustrado</li>
            <li><strong>Dificuldade de concentração</strong> - Problemas para focar nas tarefas</li>
            <li><strong>Alterações no sono</strong> - Insônia ou sono excessivo</li>
            <li><strong>Isolamento social</strong> - Evitar contato com outras pessoas</li>
            <li><strong>Sentimentos de culpa</strong> - Achar que não está fazendo o suficiente</li>
            <li><strong>Perda de motivação</strong> - Falta de interesse nas atividades</li>
          </ul>
          
          <h3>2. Estratégias de Autocuidado</h3>
          <p>Desenvolva hábitos que promovam seu bem-estar:</p>
          
          <div style="background: #d1fae5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <strong>🌱 Práticas de Autocuidado:</strong>
          </div>
          
          <h4>Físico:</h4>
          <ul>
            <li><strong>Exercícios regulares</strong> - Pelo menos 30 minutos por dia</li>
            <li><strong>Alimentação balanceada</strong> - Comidas nutritivas e regulares</li>
            <li><strong>Sono adequado</strong> - 7-9 horas por noite</li>
            <li><strong>Hidratação</strong> - Beber água regularmente</li>
            <li><strong>Pausas regulares</strong> - Descansar durante o trabalho</li>
          </ul>
          
          <h4>Emocional:</h4>
          <ul>
            <li><strong>Meditação ou mindfulness</strong> - Práticas de atenção plena</li>
            <li><strong>Respiração profunda</strong> - Técnicas de relaxamento</li>
            <li><strong>Diário de gratidão</strong> - Anotar coisas positivas</li>
            <li><strong>Hobbies relaxantes</strong> - Atividades que trazem prazer</li>
            <li><strong>Tempo com pessoas queridas</strong> - Manter relacionamentos</li>
          </ul>
          
          <h3>3. Estabelecendo Limites Saudáveis</h3>
          <p>Aprenda a dizer "não" quando necessário:</p>
          
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>🎯 Como Estabelecer Limites:</strong>
          </div>
          
          <ul>
            <li><strong>Defina horários</strong> - Estabeleça quando está disponível</li>
            <li><strong>Seja claro sobre suas capacidades</strong> - Não se comprometa além do possível</li>
            <li><strong>Pratique dizer "não"</strong> - É uma habilidade que se desenvolve</li>
            <li><strong>Comunique seus limites</strong> - Seja transparente com a equipe</li>
            <li><strong>Respeite seus próprios limites</strong> - Não se culpe por ter necessidades</li>
          </ul>
          
          <h3>4. Lidando com Situações Difíceis</h3>
          <p>Estratégias para enfrentar desafios emocionais:</p>
          
          <h4>💪 Técnicas de Enfrentamento:</h4>
          <ul>
            <li><strong>Reenquadramento</strong> - Ver situações de diferentes perspectivas</li>
            <li><strong>Foco no que pode controlar</strong> - Aceitar o que está fora do seu controle</li>
            <li><strong>Buscar apoio</strong> - Conversar com colegas ou supervisores</li>
            <li><strong>Praticar autocompaixão</strong> - Ser gentil consigo mesmo</li>
            <li><strong>Celebrar pequenas vitórias</strong> - Reconhecer progressos</li>
          </ul>
          
          <h3>5. Construindo uma Rede de Apoio</h3>
          <p>Não tente enfrentar tudo sozinho:</p>
          
          <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <strong>🤝 Fontes de Apoio:</strong>
          </div>
          
          <ul>
            <li><strong>Colegas voluntários</strong> - Pessoas que entendem sua experiência</li>
            <li><strong>Supervisores</strong> - Liderança que pode orientar</li>
            <li><strong>Amigos e família</strong> - Rede pessoal de apoio</li>
            <li><strong>Profissionais de saúde mental</strong> - Terapeutas, psicólogos</li>
            <li><strong>Grupos de apoio</strong> - Comunidades de voluntários</li>
          </ul>
          
          <h3>6. Gerenciando Emoções Intensas</h3>
          <p>Técnicas para lidar com sentimentos difíceis:</p>
          
          <h4>🧘 Técnicas de Regulação Emocional:</h4>
          <ul>
            <li><strong>Respiração 4-7-8</strong> - Inspire por 4, segure por 7, expire por 8</li>
            <li><strong>Grounding 5-4-3-2-1</strong> - Identifique 5 coisas que vê, 4 que toca, etc.</li>
            <li><strong>Pausa consciente</strong> - Pare e observe seus pensamentos</li>
            <li><strong>Movimento físico</strong> - Caminhada, alongamento</li>
            <li><strong>Expressão criativa</strong> - Desenhar, escrever, cantar</li>
          </ul>
          
          <h3>7. Prevenindo o Burnout</h3>
          <p>Estratégias para evitar o esgotamento:</p>
          
          <div style="background: #fce7f3; padding: 16px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 20px 0;">
            <strong>🛡️ Prevenção do Burnout:</strong>
          </div>
          
          <ul>
            <li><strong>Diversifique atividades</strong> - Não se limite a uma única função</li>
            <li><strong>Estabeleça metas realistas</strong> - Objetivos alcançáveis</li>
            <li><strong>Celebre conquistas</strong> - Reconheça seu impacto</li>
            <li><strong>Mantenha perspectiva</strong> - Lembre-se do propósito maior</li>
            <li><strong>Faça pausas regulares</strong> - Tempo para recarregar</li>
            <li><strong>Busque feedback positivo</strong> - Ouça sobre seu impacto</li>
          </ul>
          
          <h3>8. Quando Buscar Ajuda Profissional</h3>
          <p>Reconheça quando é hora de procurar ajuda especializada:</p>
          
          <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
            <strong>🚨 Sinais para Buscar Ajuda:</strong>
          </div>
          
          <ul>
            <li>Sintomas persistem por mais de 2 semanas</li>
            <li>Interferência significativa no trabalho ou vida pessoal</li>
            <li>Pensamentos de autolesão ou suicídio</li>
            <li>Uso de substâncias para lidar com o estresse</li>
            <li>Dificuldade extrema para funcionar normalmente</li>
            <li>Sentimentos de desesperança persistentes</li>
          </ul>
          
          <h3>9. Criando um Plano de Bem-estar</h3>
          <p>Desenvolva um plano personalizado para sua saúde mental:</p>
          
          <h4>📋 Elementos do Plano:</h4>
          <ul>
            <li><strong>Rotina diária</strong> - Horários para trabalho, descanso e lazer</li>
            <li><strong>Atividades de autocuidado</strong> - Práticas regulares de bem-estar</li>
            <li><strong>Rede de apoio</strong> - Pessoas para contatar quando necessário</li>
            <li><strong>Sinais de alerta</strong> - Como reconhecer quando precisa de ajuda</li>
            <li><strong>Estratégias de enfrentamento</strong> - Técnicas para momentos difíceis</li>
          </ul>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 2px solid #e2e8f0; margin: 20px 0;">
            <strong>✅ Checklist de Bem-estar:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>✅ Dormi pelo menos 7 horas ontem</li>
              <li>✅ Fiz uma atividade física hoje</li>
              <li>✅ Comi pelo menos uma refeição balanceada</li>
              <li>✅ Tive uma conversa significativa com alguém</li>
              <li>✅ Fiz uma pausa para relaxar</li>
              <li>✅ Reconheci algo positivo no meu dia</li>
              <li>✅ Estabeleci limites quando necessário</li>
            </ul>
          </div>
          
          <h3>10. Recursos e Apoio</h3>
          <p>Conheça recursos disponíveis para apoio:</p>
          
          <ul>
            <li><strong>CVV - Centro de Valorização da Vida</strong> - 188 (ligação gratuita)</li>
            <li><strong>CAPS - Centros de Atenção Psicossocial</strong> - Atendimento público</li>
            <li><strong>Psicólogos particulares</strong> - Atendimento privado</li>
            <li><strong>Grupos de apoio online</strong> - Comunidades virtuais</li>
            <li><strong>Apps de meditação</strong> - Headspace, Calm, Insight Timer</li>
          </ul>
          
          <p><strong>Lembre-se:</strong> Cuidar da sua saúde mental não é um luxo, é uma necessidade. Você é mais eficaz como voluntário quando está bem consigo mesmo. Não hesite em buscar ajuda quando precisar - é um sinal de força, não de fraqueza!</p>
        `,
      },
    ],
    recursos: [
      {
        title: "Ferramentas para ONGs",
        description:
          "Aplicativos e plataformas que facilitam o trabalho voluntário",
        image: "🛠️",
        category: "Tecnologia",
        readTime: "15 min",
        fullContent: `
          <h2>Ferramentas Digitais para ONGs e Voluntários</h2>
          <p>A tecnologia pode ser uma grande aliada no trabalho voluntário, facilitando a organização, comunicação e gestão de projetos. Conheça as principais ferramentas digitais que podem transformar a forma como você faz a diferença.</p>
          
          <blockquote>
            "A tecnologia não substitui o coração humano, mas pode amplificar seu impacto e tornar o voluntariado mais eficiente e acessível."
          </blockquote>
          
          <h3>1. Gestão de Projetos e Voluntários</h3>
          <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <strong>📋 Ferramentas de Organização:</strong>
          </div>
          
          <h4>Trello:</h4>
          <ul>
            <li><strong>Uso:</strong> Organização de tarefas e projetos</li>
            <li><strong>Benefícios:</strong> Interface visual, colaboração em tempo real</li>
            <li><strong>Ideal para:</strong> Equipes pequenas e médias</li>
            <li><strong>Preço:</strong> Gratuito para uso básico</li>
          </ul>
          
          <h4>Asana:</h4>
          <ul>
            <li><strong>Uso:</strong> Gestão de projetos complexos</li>
            <li><strong>Benefícios:</strong> Timeline, relatórios, automações</li>
            <li><strong>Ideal para:</strong> ONGs com múltiplos projetos</li>
            <li><strong>Preço:</strong> Plano gratuito disponível</li>
          </ul>
          
          <h4>Notion:</h4>
          <ul>
            <li><strong>Uso:</strong> Base de conhecimento e organização</li>
            <li><strong>Benefícios:</strong> Wikis, bancos de dados, templates</li>
            <li><strong>Ideal para:</strong> Documentação e planejamento</li>
            <li><strong>Preço:</strong> Plano pessoal gratuito</li>
          </ul>
          
          <h3>2. Comunicação e Colaboração</h3>
          <p>Mantenha sua equipe conectada e alinhada:</p>
          
          <div style="background: #d1fae5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <strong>💬 Ferramentas de Comunicação:</strong>
          </div>
          
          <h4>WhatsApp Business:</h4>
          <ul>
            <li><strong>Uso:</strong> Comunicação rápida com voluntários</li>
            <li><strong>Benefícios:</strong> Mensagens automáticas, catálogo</li>
            <li><strong>Ideal para:</strong> Comunicação diária</li>
            <li><strong>Preço:</strong> Gratuito</li>
          </ul>
          
          <h4>Slack:</h4>
          <ul>
            <li><strong>Uso:</strong> Comunicação organizada por canais</li>
            <li><strong>Benefícios:</strong> Integrações, arquivos, histórico</li>
            <li><strong>Ideal para:</strong> Equipes maiores</li>
            <li><strong>Preço:</strong> Plano gratuito disponível</li>
          </ul>
          
          <h4>Discord:</h4>
          <ul>
            <li><strong>Uso:</strong> Comunidade de voluntários</li>
            <li><strong>Benefícios:</strong> Canais de voz, eventos, bots</li>
            <li><strong>Ideal para:</strong> Comunidades grandes</li>
            <li><strong>Preço:</strong> Gratuito</li>
          </ul>
          
          <h3>3. Captação de Recursos e Doações</h3>
          <p>Ferramentas para financiar seus projetos:</p>
          
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>💰 Plataformas de Financiamento:</strong>
          </div>
          
          <h4>Vakinha:</h4>
          <ul>
            <li><strong>Uso:</strong> Campanhas de arrecadação</li>
            <li><strong>Benefícios:</strong> Interface simples, compartilhamento fácil</li>
            <li><strong>Ideal para:</strong> Projetos específicos</li>
            <li><strong>Taxa:</strong> 5% sobre doações</li>
          </ul>
          
          <h4>Benfeitoria:</h4>
          <ul>
            <li><strong>Uso:</strong> Financiamento coletivo para causas sociais</li>
            <li><strong>Benefícios:</strong> Foco em impacto social, mentoria</li>
            <li><strong>Ideal para:</strong> ONGs estabelecidas</li>
            <li><strong>Taxa:</strong> 8% sobre arrecadação</li>
          </ul>
          
          <h4>PagSeguro/PicPay:</h4>
          <ul>
            <li><strong>Uso:</strong> Recebimento de doações</li>
            <li><strong>Benefícios:</strong> PIX, cartão, boleto</li>
            <li><strong>Ideal para:</strong> Doações recorrentes</li>
            <li><strong>Taxa:</strong> Varia por método</li>
          </ul>
          
          <h3>4. Marketing Digital e Divulgação</h3>
          <p>Amplifique o alcance das suas ações:</p>
          
          <h4>Canva:</h4>
          <ul>
            <li><strong>Uso:</strong> Criação de materiais gráficos</li>
            <li><strong>Benefícios:</strong> Templates, banco de imagens</li>
            <li><strong>Ideal para:</strong> Redes sociais, cartazes</li>
            <li><strong>Preço:</strong> Plano gratuito disponível</li>
          </ul>
          
          <h4>Mailchimp:</h4>
          <ul>
            <li><strong>Uso:</strong> Email marketing</li>
            <li><strong>Benefícios:</strong> Automação, templates, relatórios</li>
            <li><strong>Ideal para:</strong> Comunicação com doadores</li>
            <li><strong>Preço:</strong> Até 2.000 contatos gratuitos</li>
          </ul>
          
          <h4>Google Analytics:</h4>
          <ul>
            <li><strong>Uso:</strong> Análise de tráfego do site</li>
            <li><strong>Benefícios:</strong> Métricas detalhadas, relatórios</li>
            <li><strong>Ideal para:</strong> Otimização de campanhas</li>
            <li><strong>Preço:</strong> Gratuito</li>
          </ul>
          
          <h3>5. Gestão Financeira</h3>
          <p>Organize as finanças da sua organização:</p>
          
          <div style="background: #fce7f3; padding: 16px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 20px 0;">
            <strong>💳 Ferramentas Financeiras:</strong>
          </div>
          
          <h4>Google Sheets:</h4>
          <ul>
            <li><strong>Uso:</strong> Controle de gastos e receitas</li>
            <li><strong>Benefícios:</strong> Colaboração, fórmulas, gráficos</li>
            <li><strong>Ideal para:</strong> ONGs pequenas</li>
            <li><strong>Preço:</strong> Gratuito</li>
          </ul>
          
          <h4>ContaAzul:</h4>
          <ul>
            <li><strong>Uso:</strong> Gestão financeira completa</li>
            <li><strong>Benefícios:</strong> Relatórios, integração bancária</li>
            <li><strong>Ideal para:</strong> ONGs maiores</li>
            <li><strong>Preço:</strong> A partir de R$ 49/mês</li>
          </ul>
          
          <h3>6. Voluntariado e Engajamento</h3>
          <p>Plataformas específicas para voluntariado:</p>
          
          <h4>Atados:</h4>
          <ul>
            <li><strong>Uso:</strong> Plataforma de voluntariado</li>
            <li><strong>Benefícios:</strong> Cadastro de voluntários, vagas</li>
            <li><strong>Ideal para:</strong> Recrutamento de voluntários</li>
            <li><strong>Preço:</strong> Gratuito para ONGs</li>
          </ul>
          
          <h4>Transforma Brasil:</h4>
          <ul>
            <li><strong>Uso:</strong> Conexão entre voluntários e causas</li>
            <li><strong>Benefícios:</strong> Gamificação, certificados</li>
            <li><strong>Ideal para:</strong> Engajamento de jovens</li>
            <li><strong>Preço:</strong> Gratuito</li>
          </ul>
          
          <h3>7. Educação e Capacitação</h3>
          <p>Ferramentas para treinamento e desenvolvimento:</p>
          
          <div style="background: #f3e8ff; padding: 16px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
            <strong>📚 Plataformas Educacionais:</strong>
          </div>
          
          <h4>Google Classroom:</h4>
          <ul>
            <li><strong>Uso:</strong> Cursos online para voluntários</li>
            <li><strong>Benefícios:</strong> Material didático, avaliações</li>
            <li><strong>Ideal para:</strong> Treinamentos internos</li>
            <li><strong>Preço:</strong> Gratuito</li>
          </ul>
          
          <h4>Zoom/Google Meet:</h4>
          <ul>
            <li><strong>Uso:</strong> Reuniões e treinamentos online</li>
            <li><strong>Benefícios:</strong> Gravação, compartilhamento de tela</li>
            <li><strong>Ideal para:</strong> Capacitação remota</li>
            <li><strong>Preço:</strong> Planos gratuitos disponíveis</li>
          </ul>
          
          <h3>8. Aplicativos Móveis Úteis</h3>
          <p>Ferramentas para usar no celular:</p>
          
          <h4>Evernote:</h4>
          <ul>
            <li><strong>Uso:</strong> Anotações e organização</li>
            <li><strong>Benefícios:</strong> Sincronização, busca avançada</li>
            <li><strong>Ideal para:</strong> Ideias e planejamento</li>
            <li><strong>Preço:</strong> Plano básico gratuito</li>
          </ul>
          
          <h4>CamScanner:</h4>
          <ul>
            <li><strong>Uso:</strong> Digitalização de documentos</li>
            <li><strong>Benefícios:</strong> PDF, OCR, compartilhamento</li>
            <li><strong>Ideal para:</strong> Documentação de campo</li>
            <li><strong>Preço:</strong> Versão gratuita disponível</li>
          </ul>
          
          <h3>9. Dicas para Escolher Ferramentas</h3>
          <p>Como selecionar as melhores opções para sua ONG:</p>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 2px solid #e2e8f0; margin: 20px 0;">
            <strong>🎯 Critérios de Seleção:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>✅ Facilidade de uso</li>
              <li>✅ Custo-benefício</li>
              <li>✅ Suporte técnico</li>
              <li>✅ Integração com outras ferramentas</li>
              <li>✅ Segurança dos dados</li>
              <li>✅ Escalabilidade</li>
            </ul>
          </div>
          
          <h3>10. Implementação Gradual</h3>
          <p>Como introduzir tecnologia na sua organização:</p>
          
          <h4>📈 Fases de Implementação:</h4>
          <ul>
            <li><strong>Fase 1:</strong> Ferramentas básicas (comunicação, organização)</li>
            <li><strong>Fase 2:</strong> Gestão de projetos e voluntários</li>
            <li><strong>Fase 3:</strong> Marketing digital e captação</li>
            <li><strong>Fase 4:</strong> Análise e otimização</li>
          </ul>
          
          <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
            <strong>⚠️ Cuidados Importantes:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>Treine a equipe antes de implementar</li>
              <li>Comece com ferramentas simples</li>
              <li>Tenha um plano de backup</li>
              <li>Proteja dados sensíveis</li>
              <li>Mantenha a comunicação humana</li>
            </ul>
          </div>
          
          <p><strong>Lembre-se:</strong> A tecnologia é uma ferramenta poderosa, mas não substitui o contato humano e a paixão pelo voluntariado. Use essas ferramentas para amplificar seu impacto, não para distanciar-se das pessoas que você está ajudando!</p>
        `,
      },
      {
        title: "Legislação do Terceiro Setor",
        description:
          "Entendendo as leis que regulamentam o voluntariado no Brasil",
        image: "⚖️",
        category: "Legal",
        readTime: "20 min",
        fullContent: `
          <h2>Legislação do Terceiro Setor no Brasil</h2>
          <p>O terceiro setor no Brasil é regulamentado por uma complexa legislação que visa garantir transparência, responsabilidade e eficácia das organizações sem fins lucrativos. Conhecer essas leis é fundamental para ONGs e voluntários atuarem dentro da legalidade.</p>
          
          <blockquote>
            "A legislação do terceiro setor não é um obstáculo, mas uma ferramenta para garantir que o trabalho social seja feito com responsabilidade e transparência."
          </blockquote>
          
          <h3>1. Marco Legal do Terceiro Setor</h3>
          <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <strong>📋 Lei 13.019/2014 - Marco Regulatório das Organizações da Sociedade Civil:</strong>
          </div>
          
          <p>Esta é a principal lei que regula as parcerias entre o poder público e as organizações da sociedade civil:</p>
          
          <h4>Principais Dispositivos:</h4>
          <ul>
            <li><strong>Termos de Colaboração</strong> - Para atividades de interesse público</li>
            <li><strong>Termos de Fomento</strong> - Para transferência de recursos financeiros</li>
            <li><strong>Acordos de Cooperação</strong> - Para atividades conjuntas</li>
            <li><strong>Prestação de Contas</strong> - Obrigatoriedade de transparência</li>
            <li><strong>Controle Social</strong> - Participação da sociedade na fiscalização</li>
          </ul>
          
          <h3>2. Lei do Voluntariado</h3>
          <div style="background: #d1fae5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <strong>🤝 Lei 9.608/1998 - Lei do Voluntariado:</strong>
          </div>
          
          <p>Define o trabalho voluntário e estabelece os direitos e deveres dos voluntários:</p>
          
          <h4>Conceito de Voluntário:</h4>
          <ul>
            <li><strong>Atividade não remunerada</strong> - Prestada por pessoa física</li>
            <li><strong>Objetivo cívico</strong> - De interesse social e comunitário</li>
            <li><strong>Sem vínculo empregatício</strong> - Não caracteriza relação de trabalho</li>
            <li><strong>Termo de adesão</strong> - Documento que formaliza a relação</li>
          </ul>
          
          <h4>Direitos do Voluntário:</h4>
          <ul>
            <li>Receber treinamento adequado</li>
            <li>Ser informado sobre os riscos da atividade</li>
            <li>Receber certificado de participação</li>
            <li>Ter seguro contra acidentes pessoais</li>
            <li>Ser respeitado em sua dignidade</li>
          </ul>
          
          <h4>Deveres do Voluntário:</h4>
          <ul>
            <li>Cumprir os compromissos assumidos</li>
            <li>Respeitar os princípios da organização</li>
            <li>Manter sigilo sobre informações confidenciais</li>
            <li>Zelar pela boa imagem da organização</li>
            <li>Comunicar impossibilidade de comparecimento</li>
          </ul>
          
          <h3>3. Tipos de Organizações do Terceiro Setor</h3>
          <p>Diferentes formas jurídicas para organizações sem fins lucrativos:</p>
          
          <h4>🏛️ Associações (Lei 10.406/2002 - Código Civil):</h4>
          <ul>
            <li><strong>Constituição:</strong> Por escritura pública ou instrumento particular</li>
            <li><strong>Objetivo:</strong> Fins não econômicos</li>
            <li><strong>Governança:</strong> Assembleia geral, diretoria, conselho fiscal</li>
            <li><strong>Responsabilidade:</strong> Limitada ao patrimônio social</li>
            <li><strong>Registro:</strong> Cartório de Registro Civil de Pessoas Jurídicas</li>
          </ul>
          
          <h4>🏢 Fundações (Lei 10.406/2002 - Código Civil):</h4>
          <ul>
            <li><strong>Constituição:</strong> Por escritura pública ou testamento</li>
            <li><strong>Patrimônio:</strong> Dotação inicial mínima</li>
            <li><strong>Governança:</strong> Conselho curador, diretoria executiva</li>
            <li><strong>Fiscalização:</strong> Ministério Público</li>
            <li><strong>Registro:</strong> Cartório de Registro Civil de Pessoas Jurídicas</li>
          </ul>
          
          <h4>🌐 OSCIPs (Lei 9.790/1999):</h4>
          <ul>
            <li><strong>Qualificação:</strong> Organização da Sociedade Civil de Interesse Público</li>
            <li><strong>Vantagens:</strong> Facilidades para parcerias com o poder público</li>
            <li><strong>Requisitos:</strong> Estatuto específico, finalidade social</li>
            <li><strong>Fiscalização:</strong> Controladoria-Geral da União</li>
            <li><strong>Registro:</strong> Ministério da Justiça</li>
          </ul>
          
          <h3>4. Aspectos Tributários</h3>
          <p>Regime tributário especial para organizações sem fins lucrativos:</p>
          
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>💰 Benefícios Fiscais:</strong>
          </div>
          
          <h4>Isenções Disponíveis:</h4>
          <ul>
            <li><strong>Imposto de Renda</strong> - Sobre receitas de atividades-fim</li>
            <li><strong>Contribuição Social</strong> - Sobre folha de pagamento</li>
            <li><strong>PIS/PASEP</strong> - Sobre receitas operacionais</li>
            <li><strong>COFINS</strong> - Sobre receitas operacionais</li>
            <li><strong>IPTU</strong> - Sobre imóveis próprios (municipal)</li>
          </ul>
          
          <h4>Requisitos para Isenções:</h4>
          <ul>
            <li>Finalidade não lucrativa</li>
            <li>Não distribuição de lucros</li>
            <li>Aplicação integral dos recursos nas atividades-fim</li>
            <li>Manutenção de escrituração contábil</li>
            <li>Prestação de contas anual</li>
          </ul>
          
          <h3>5. Prestação de Contas</h3>
          <p>Obrigações de transparência e prestação de contas:</p>
          
          <div style="background: #fce7f3; padding: 16px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 20px 0;">
            <strong>📊 Obrigações Contábeis:</strong>
          </div>
          
          <h4>Documentos Obrigatórios:</h4>
          <ul>
            <li><strong>Balanço Patrimonial</strong> - Situação patrimonial</li>
            <li><strong>Demonstração do Resultado</strong> - Receitas e despesas</li>
            <li><strong>Demonstração das Mutações do Patrimônio</strong> - Variações patrimoniais</li>
            <li><strong>Demonstração dos Fluxos de Caixa</strong> - Movimentação financeira</li>
            <li><strong>Notas Explicativas</strong> - Esclarecimentos adicionais</li>
          </ul>
          
          <h4>Prazos e Órgãos:</h4>
          <ul>
            <li><strong>Receita Federal</strong> - 31 de maio (DCTF)</li>
            <li><strong>Ministério da Justiça</strong> - 30 de junho (OSCIPs)</li>
            <li><strong>Controladoria-Geral da União</strong> - Portal da Transparência</li>
            <li><strong>Assembleia Geral</strong> - Anualmente</li>
          </ul>
          
          <h3>6. Responsabilidade Civil e Criminal</h3>
          <p>Responsabilidades dos dirigentes e organizações:</p>
          
          <h4>👥 Responsabilidade dos Dirigentes:</h4>
          <ul>
            <li><strong>Responsabilidade Civil</strong> - Por danos causados a terceiros</li>
            <li><strong>Responsabilidade Criminal</strong> - Por crimes cometidos</li>
            <li><strong>Responsabilidade Administrativa</strong> - Por irregularidades</li>
            <li><strong>Responsabilidade Tributária</strong> - Por obrigações fiscais</li>
          </ul>
          
          <h4>🛡️ Proteções Legais:</h4>
          <ul>
            <li><strong>Seguro de Responsabilidade Civil</strong> - Para dirigentes</li>
            <li><strong>Termo de Adesão</strong> - Para voluntários</li>
            <li><strong>Regulamento Interno</strong> - Definição de responsabilidades</li>
            <li><strong>Atas de Reuniões</strong> - Registro de decisões</li>
          </ul>
          
          <h3>7. Legislação Trabalhista</h3>
          <p>Aspectos trabalhistas no terceiro setor:</p>
          
          <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
            <strong>⚠️ Diferenças Importantes:</strong>
          </div>
          
          <h4>Voluntário vs. Empregado:</h4>
          <ul>
            <li><strong>Voluntário:</strong> Sem vínculo empregatício, sem remuneração</li>
            <li><strong>Empregado:</strong> Com vínculo empregatício, com remuneração</li>
            <li><strong>Estagiário:</strong> Vínculo de estágio, bolsa-auxílio</li>
            <li><strong>Prestador de Serviço:</strong> Vínculo contratual, honorários</li>
          </ul>
          
          <h4>Obrigações Trabalhistas:</h4>
          <ul>
            <li>Registro em carteira de trabalho</li>
            <li>Pagamento de salário mínimo</li>
            <li>Contribuições previdenciárias</li>
            <li>FGTS e 13º salário</li>
            <li>Férias e descanso semanal</li>
          </ul>
          
          <h3>8. Proteção de Dados</h3>
          <p>Lei Geral de Proteção de Dados (LGPD) no terceiro setor:</p>
          
          <div style="background: #f3e8ff; padding: 16px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
            <strong>🔒 LGPD - Lei 13.709/2018:</strong>
          </div>
          
          <h4>Obrigações das ONGs:</h4>
          <ul>
            <li><strong>Consentimento</strong> - Para coleta de dados pessoais</li>
            <li><strong>Finalidade</strong> - Especificar o uso dos dados</li>
            <li><strong>Segurança</strong> - Proteger dados contra vazamentos</li>
            <li><strong>Transparência</strong> - Informar sobre o tratamento</li>
            <li><strong>Direitos dos titulares</strong> - Acesso, correção, exclusão</li>
          </ul>
          
          <h3>9. Captação de Recursos</h3>
          <p>Legislação sobre doações e captação:</p>
          
          <h4>💰 Doações e Incentivos:</h4>
          <ul>
            <li><strong>Lei de Incentivo à Cultura</strong> - Lei Rouanet</li>
            <li><strong>Lei de Incentivo ao Esporte</strong> - Lei de Incentivo ao Esporte</li>
            <li><strong>Fundos da Infância</strong> - FIA municipal e estadual</li>
            <li><strong>Doações Diretas</strong> - Pessoas físicas e jurídicas</li>
            <li><strong>Crowdfunding</strong> - Financiamento coletivo</li>
          </ul>
          
          <h3>10. Compliance e Boas Práticas</h3>
          <p>Como manter a organização em conformidade:</p>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 2px solid #e2e8f0; margin: 20px 0;">
            <strong>✅ Checklist de Compliance:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>✅ Estatuto atualizado e registrado</li>
              <li>✅ Ata de eleição da diretoria</li>
              <li>✅ CNPJ ativo e regular</li>
              <li>✅ Inscrição municipal atualizada</li>
              <li>✅ Escrituração contábil em dia</li>
              <li>✅ Prestação de contas anual</li>
              <li>✅ Termos de adesão dos voluntários</li>
              <li>✅ Seguro de responsabilidade civil</li>
              <li>✅ Política de proteção de dados</li>
              <li>✅ Regulamento interno atualizado</li>
            </ul>
          </div>
          
          <h3>11. Recursos e Apoio Jurídico</h3>
          <p>Onde buscar ajuda jurídica especializada:</p>
          
          <ul>
            <li><strong>Escritórios especializados</strong> - Advocacia do terceiro setor</li>
            <li><strong>Consultorias jurídicas</strong> - Assessoria especializada</li>
            <li><strong>ONGs de apoio jurídico</strong> - Instituto Pro Bono, etc.</li>
            <li><strong>Universidades</strong> - Clínicas jurídicas</li>
            <li><strong>Órgãos públicos</strong> - Ministério da Justiça, CGU</li>
          </ul>
          
          <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
            <strong>⚠️ Importante:</strong> Esta é uma visão geral da legislação. Cada caso é único e pode requerer orientação jurídica específica. Sempre consulte um advogado especializado em terceiro setor para questões específicas da sua organização.
          </div>
          
          <p><strong>Lembre-se:</strong> Conhecer e cumprir a legislação não é apenas uma obrigação, mas uma forma de garantir a credibilidade, transparência e sustentabilidade da sua organização. A legalidade é a base para um trabalho social eficaz e duradouro!</p>
        `,
      },
      {
        title: "Financiamento de Projetos",
        description: "Como captar recursos para suas ações sociais",
        image: "💰",
        category: "Finanças",
        readTime: "18 min",
        fullContent: `
          <h2>Financiamento de Projetos Sociais: Guia Completo</h2>
          <p>Captar recursos é um dos maiores desafios das organizações do terceiro setor. Este guia completo apresenta estratégias, fontes de financiamento e técnicas para garantir a sustentabilidade financeira dos seus projetos sociais.</p>
          
          <blockquote>
            "O financiamento não é apenas sobre dinheiro, é sobre construir parcerias duradouras que compartilham da mesma visão de transformação social."
          </blockquote>
          
          <h3>1. Planejamento Financeiro Estratégico</h3>
          <div style="background: #dbeafe; padding: 16px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0;">
            <strong>📊 Fundamentos do Planejamento:</strong>
          </div>
          
          <h4>Análise de Necessidades:</h4>
          <ul>
            <li><strong>Custos operacionais</strong> - Despesas fixas e variáveis</li>
            <li><strong>Investimentos</strong> - Equipamentos, infraestrutura</li>
            <li><strong>Recursos humanos</strong> - Salários, benefícios, voluntários</li>
            <li><strong>Projetos específicos</strong> - Ações pontuais</li>
            <li><strong>Reserva de emergência</strong> - Fundo de contingência</li>
          </ul>
          
          <h4>Orçamento Detalhado:</h4>
          <ul>
            <li><strong>Receitas projetadas</strong> - Fontes de financiamento</li>
            <li><strong>Despesas categorizadas</strong> - Por tipo e período</li>
            <li><strong>Fluxo de caixa</strong> - Entradas e saídas mensais</li>
            <li><strong>Indicadores financeiros</strong> - Métricas de acompanhamento</li>
          </ul>
          
          <h3>2. Fontes de Financiamento</h3>
          <p>Diversifique suas fontes para maior segurança financeira:</p>
          
          <div style="background: #d1fae5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <strong>🏛️ Setor Público:</strong>
          </div>
          
          <h4>Governo Federal:</h4>
          <ul>
            <li><strong>Lei de Incentivo à Cultura</strong> - Lei Rouanet</li>
            <li><strong>Lei de Incentivo ao Esporte</strong> - Lei de Incentivo ao Esporte</li>
            <li><strong>Fundos Setoriais</strong> - FIA, FNAS, etc.</li>
            <li><strong>Editais Públicos</strong> - Ministérios e autarquias</li>
            <li><strong>Parcerias Públicas</strong> - Termos de fomento e colaboração</li>
          </ul>
          
          <h4>Governos Estaduais e Municipais:</h4>
          <ul>
            <li><strong>Fundos Estaduais</strong> - FIA estadual, fundos setoriais</li>
            <li><strong>Fundos Municipais</strong> - FIA municipal, fundos de cultura</li>
            <li><strong>Editais Locais</strong> - Secretarias e órgãos municipais</li>
            <li><strong>Parcerias Locais</strong> - Convênios e termos de colaboração</li>
          </ul>
          
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>🏢 Setor Privado:</strong>
          </div>
          
          <h4>Empresas:</h4>
          <ul>
            <li><strong>Responsabilidade Social Empresarial</strong> - RSE</li>
            <li><strong>Incentivos Fiscais</strong> - Lei de Incentivo, FIA</li>
            <li><strong>Patrocínios Diretos</strong> - Marketing de causa</li>
            <li><strong>Parcerias Estratégicas</strong> - Cooperação técnica</li>
            <li><strong>Doações Corporativas</strong> - Recursos próprios</li>
          </ul>
          
          <h4>Fundações e Institutos:</h4>
          <ul>
            <li><strong>Fundos Comunitários</strong> - Fundações comunitárias</li>
            <li><strong>Institutos Empresariais</strong> - Fundações de empresas</li>
            <li><strong>Fundos Internacionais</strong> - Organizações globais</li>
            <li><strong>Editais de Fundações</strong> - Chamadas públicas</li>
          </ul>
          
          <div style="background: #fce7f3; padding: 16px; border-radius: 8px; border-left: 4px solid #ec4899; margin: 20px 0;">
            <strong>👥 Setor Social:</strong>
          </div>
          
          <h4>Indivíduos:</h4>
          <ul>
            <li><strong>Doações Pessoais</strong> - Pessoas físicas</li>
            <li><strong>Campanhas de Arrecadação</strong> - Vakinha, Benfeitoria</li>
            <li><strong>Doações Recorrentes</strong> - Mensalidades</li>
            <li><strong>Eventos Beneficentes</strong> - Jantares, leilões</li>
            <li><strong>Legados</strong> - Heranças e testamentos</li>
          </ul>
          
          <h3>3. Estratégias de Captação</h3>
          <p>Técnicas eficazes para conseguir recursos:</p>
          
          <h4>📝 Elaboração de Projetos:</h4>
          <ul>
            <li><strong>Diagnóstico Situacional</strong> - Análise do problema</li>
            <li><strong>Justificativa</strong> - Por que o projeto é necessário</li>
            <li><strong>Objetivos Claros</strong> - Metas específicas e mensuráveis</li>
            <li><strong>Metodologia</strong> - Como será executado</li>
            <li><strong>Cronograma</strong> - Prazos e etapas</li>
            <li><strong>Orçamento Detalhado</strong> - Custos por item</li>
            <li><strong>Indicadores de Impacto</strong> - Como medir resultados</li>
          </ul>
          
          <h4>🤝 Relacionamento com Doadores:</h4>
          <ul>
            <li><strong>Pesquisa de Perfil</strong> - Conheça seus doadores</li>
            <li><strong>Comunicação Personalizada</strong> - Mensagens específicas</li>
            <li><strong>Transparência</strong> - Prestação de contas clara</li>
            <li><strong>Reconhecimento</strong> - Agradecimentos e certificados</li>
            <li><strong>Relacionamento Contínuo</strong> - Manter contato regular</li>
          </ul>
          
          <h3>4. Editais e Chamadas Públicas</h3>
          <p>Como participar de seleções públicas:</p>
          
          <div style="background: #f3e8ff; padding: 16px; border-radius: 8px; border-left: 4px solid #8b5cf6; margin: 20px 0;">
            <strong>📋 Preparação para Editais:</strong>
          </div>
          
          <h4>Análise do Edital:</h4>
          <ul>
            <li><strong>Objetivo do Edital</strong> - O que se pretende financiar</li>
            <li><strong>Público-Alvo</strong> - Quem pode participar</li>
            <li><strong>Valor Disponível</strong> - Recursos ofertados</li>
            <li><strong>Prazos</strong> - Datas importantes</li>
            <li><strong>Documentação</strong> - Requisitos obrigatórios</li>
            <li><strong>Critérios de Avaliação</strong> - Como será julgado</li>
          </ul>
          
          <h4>Documentação Necessária:</h4>
          <ul>
            <li><strong>Projeto Técnico</strong> - Descrição detalhada</li>
            <li><strong>Plano de Trabalho</strong> - Cronograma de atividades</li>
            <li><strong>Orçamento</strong> - Planilha de custos</li>
            <li><strong>Comprovação Jurídica</strong> - CNPJ, estatuto</li>
            <li><strong>Comprovação Fiscal</strong> - Certidões negativas</li>
            <li><strong>Comprovação Técnica</strong> - Currículos, portfólio</li>
          </ul>
          
          <h3>5. Crowdfunding e Financiamento Coletivo</h3>
          <p>Estratégias para campanhas online:</p>
          
          <h4>🌐 Plataformas de Crowdfunding:</h4>
          <ul>
            <li><strong>Vakinha</strong> - Maior plataforma brasileira</li>
            <li><strong>Benfeitoria</strong> - Foco em impacto social</li>
            <li><strong>Kickante</strong> - Projetos diversos</li>
            <li><strong>Catarse</strong> - Projetos criativos</li>
            <li><strong>Abacashi</strong> - Causas sociais</li>
          </ul>
          
          <h4>📱 Estratégias de Campanha:</h4>
          <ul>
            <li><strong>Meta Realista</strong> - Valor alcançável</li>
            <li><strong>História Pessoal</strong> - Narrativa envolvente</li>
            <li><strong>Vídeo Atrativo</strong> - Apresentação visual</li>
            <li><strong>Recompensas Criativas</strong> - Incentivos para doadores</li>
            <li><strong>Divulgação Intensiva</strong> - Redes sociais, email</li>
            <li><strong>Atualizações Regulares</strong> - Manter engajamento</li>
          </ul>
          
          <h3>6. Parcerias Estratégicas</h3>
          <p>Construa relacionamentos duradouros:</p>
          
          <div style="background: #fef2f2; padding: 16px; border-radius: 8px; border-left: 4px solid #ef4444; margin: 20px 0;">
            <strong>🤝 Tipos de Parcerias:</strong>
          </div>
          
          <h4>Parcerias com Empresas:</h4>
          <ul>
            <li><strong>Marketing de Causa</strong> - Associação de marca</li>
            <li><strong>Voluntariado Corporativo</strong> - Engajamento de funcionários</li>
            <li><strong>Doação de Produtos</strong> - Materiais e equipamentos</li>
            <li><strong>Consultoria Pro Bono</strong> - Serviços especializados</li>
            <li><strong>Eventos Conjuntos</strong> - Ações de mobilização</li>
          </ul>
          
          <h4>Parcerias com ONGs:</h4>
          <ul>
            <li><strong>Consórcios</strong> - Projetos em conjunto</li>
            <li><strong>Compartilhamento de Recursos</strong> - Infraestrutura</li>
            <li><strong>Intercâmbio de Experiências</strong> - Aprendizado mútuo</li>
            <li><strong>Advocacy Conjunto</strong> - Defesa de causas</li>
          </ul>
          
          <h3>7. Gestão Financeira</h3>
          <p>Organize e controle seus recursos:</p>
          
          <h4>💰 Controle Financeiro:</h4>
          <ul>
            <li><strong>Fluxo de Caixa</strong> - Entradas e saídas</li>
            <li><strong>Conciliação Bancária</strong> - Controle de contas</li>
            <li><strong>Controle de Receitas</strong> - Acompanhamento de doações</li>
            <li><strong>Controle de Despesas</strong> - Gastos por categoria</li>
            <li><strong>Relatórios Mensais</strong> - Situação financeira</li>
          </ul>
          
          <h4>📊 Prestação de Contas:</h4>
          <ul>
            <li><strong>Relatórios de Execução</strong> - Atividades realizadas</li>
            <li><strong>Relatórios Financeiros</strong> - Uso dos recursos</li>
            <li><strong>Evidências</strong> - Comprovantes e fotos</li>
            <li><strong>Transparência Pública</strong> - Portal da transparência</li>
            <li><strong>Comunicação com Doadores</strong> - Relatórios personalizados</li>
          </ul>
          
          <h3>8. Diversificação de Receitas</h3>
          <p>Estratégias para reduzir dependência de uma única fonte:</p>
          
          <div style="background: #f8fafc; padding: 16px; border-radius: 8px; border: 2px solid #e2e8f0; margin: 20px 0;">
            <strong>🎯 Estratégias de Diversificação:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>✅ Múltiplas fontes de financiamento</li>
              <li>✅ Receitas próprias (produtos, serviços)</li>
              <li>✅ Doações recorrentes</li>
              <li>✅ Parcerias de longo prazo</li>
              <li>✅ Fundo de reserva</li>
              <li>✅ Investimentos sociais</li>
            </ul>
          </div>
          
          <h4>Receitas Próprias:</h4>
          <ul>
            <li><strong>Venda de Produtos</strong> - Artesanato, publicações</li>
            <li><strong>Prestação de Serviços</strong> - Consultorias, cursos</li>
            <li><strong>Eventos Pagos</strong> - Seminários, workshops</li>
            <li><strong>Aluguel de Espaços</strong> - Salas, equipamentos</li>
            <li><strong>Licenciamento</strong> - Uso de marca, metodologias</li>
          </ul>
          
          <h3>9. Comunicação e Marketing</h3>
          <p>Comunique seu impacto para atrair recursos:</p>
          
          <h4>📢 Estratégias de Comunicação:</h4>
          <ul>
            <li><strong>Histórias de Impacto</strong> - Casos reais de transformação</li>
            <li><strong>Dados e Métricas</strong> - Resultados quantificados</li>
            <li><strong>Materiais Visuais</strong> - Fotos, vídeos, infográficos</li>
            <li><strong>Redes Sociais</strong> - Facebook, Instagram, LinkedIn</li>
            <li><strong>Website</strong> - Plataforma de apresentação</li>
            <li><strong>Newsletter</strong> - Comunicação regular</li>
          </ul>
          
          <h4>🎨 Materiais de Captação:</h4>
          <ul>
            <li><strong>Proposta de Projeto</strong> - Documento técnico</li>
            <li><strong>Apresentação Executiva</strong> - Pitch de 5 minutos</li>
            <li><strong>Folder Institucional</strong> - Material de apresentação</li>
            <li><strong>Vídeo Institucional</strong> - Apresentação visual</li>
            <li><strong>Relatório de Impacto</strong> - Resultados alcançados</li>
          </ul>
          
          <h3>10. Ferramentas e Tecnologia</h3>
          <p>Aproveite a tecnologia para otimizar a captação:</p>
          
          <h4>💻 Ferramentas Digitais:</h4>
          <ul>
            <li><strong>CRM para ONGs</strong> - Gestão de relacionamento</li>
            <li><strong>Plataformas de Doação</strong> - Pagamentos online</li>
            <li><strong>Email Marketing</strong> - Mailchimp, RD Station</li>
            <li><strong>Redes Sociais</strong> - Facebook Ads, Instagram</li>
            <li><strong>Analytics</strong> - Google Analytics, Facebook Insights</li>
          </ul>
          
          <h3>11. Sustentabilidade Financeira</h3>
          <p>Construa uma organização financeiramente sustentável:</p>
          
          <div style="background: #d1fae5; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
            <strong>🌱 Princípios de Sustentabilidade:</strong>
          </div>
          
          <ul>
            <li><strong>Diversificação de Fontes</strong> - Não depender de uma única fonte</li>
            <li><strong>Reserva Financeira</strong> - Fundo de emergência</li>
            <li><strong>Eficiência Operacional</strong> - Otimizar custos</li>
            <li><strong>Receitas Recorrentes</strong> - Doações mensais, parcerias</li>
            <li><strong>Planejamento de Longo Prazo</strong> - Visão estratégica</li>
            <li><strong>Transparência</strong> - Credibilidade com doadores</li>
          </ul>
          
          <h3>12. Dicas Práticas</h3>
          <p>Recomendações para o sucesso na captação:</p>
          
          <div style="background: #fef3c7; padding: 16px; border-radius: 8px; border-left: 4px solid #f59e0b; margin: 20px 0;">
            <strong>💡 Dicas de Ouro:</strong>
            <ul style="margin: 10px 0 0 0;">
              <li>Comece pequeno e vá crescendo</li>
              <li>Construa relacionamentos antes de pedir</li>
              <li>Seja transparente sobre o uso dos recursos</li>
              <li>Comunique resultados regularmente</li>
              <li>Diversifique suas fontes de receita</li>
              <li>Invista em capacitação da equipe</li>
              <li>Use tecnologia a seu favor</li>
              <li>Mantenha foco no impacto social</li>
            </ul>
          </div>
          
          <h3>13. Recursos e Apoio</h3>
          <p>Onde buscar ajuda especializada:</p>
          
          <ul>
            <li><strong>Consultorias Especializadas</strong> - Captação de recursos</li>
            <li><strong>Cursos e Treinamentos</strong> - Capacitação em captação</li>
            <li><strong>Redes de ONGs</strong> - Troca de experiências</li>
            <li><strong>Fundos de Apoio</strong> - Recursos para capacitação</li>
            <li><strong>Mentorias</strong> - Acompanhamento especializado</li>
          </ul>
          
          <p><strong>Lembre-se:</strong> A captação de recursos é um processo contínuo que requer paciência, persistência e relacionamento. O sucesso não acontece da noite para o dia, mas com estratégia, dedicação e transparência, sua organização pode construir uma base financeira sólida para continuar fazendo a diferença na sociedade!</p>
        `,
      },
    ],
  };

  const openArticleModal = (article) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 text-white py-12 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white opacity-10 rounded-full animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-white opacity-10 rounded-full animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/4 w-12 h-12 bg-white opacity-10 rounded-full animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">Conhecimento é Poder</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Centro de</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-300">
              Conhecimento
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto text-orange-100 leading-relaxed">
            Aprenda, inspire-se e desenvolva suas habilidades para fazer a
            diferença na sociedade através do voluntariado.
          </p>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore Nossos Conteúdos
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selecione uma categoria para descobrir artigos, dicas e recursos
              valiosos
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg"
                    : "bg-white text-gray-700 border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50"
                }`}
              >
                <span className="text-2xl">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <section className="py-4 bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content[activeTab].map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden h-full flex flex-col"
              >
                {/* Header */}
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          {item.category}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {item.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3 flex-1">
                    {item.description}
                  </p>

                  <button
                    onClick={() => openArticleModal(item)}
                    className="w-full group relative px-4 py-2 text-sm font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all duration-300"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      Ler Artigo
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl shadow-2xl border border-orange-100 overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                {/* Content */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 bg-orange-100 border border-orange-200 rounded-full px-4 py-2 mb-6">
                    <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                    <span className="text-sm font-medium text-orange-700">
                      Artigo em Destaque
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-yellow-600">
                      Pesquisa Voluntariado Brasil
                    </span>{" "}
                    2021
                  </h2>

                  <p className="text-base md:text-lg text-gray-600 mb-8 leading-relaxed">
                    Estudo abrangente sobre o cenário do voluntariado no Brasil,
                    apresentando dados atualizados sobre o perfil dos
                    voluntários, principais causas apoiadas e o impacto social
                    gerado. Uma análise detalhada que revela tendências e
                    oportunidades no terceiro setor brasileiro.
                  </p>

                  {/* Author and Reading Time */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8 justify-center lg:justify-start">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-lg">📊</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-semibold text-gray-900 leading-tight">
                          IDIS - Instituto para o Desenvolvimento do
                          Investimento Social
                        </div>
                        <div className="text-xs text-gray-600">
                          Pesquisa e Análise do Terceiro Setor
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-1">
                      <svg
                        className="w-4 h-4 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      25 min de leitura
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="flex justify-center lg:justify-start">
                    <button
                      onClick={() =>
                        window.open(
                          "https://www.idis.org.br/wp-content/uploads/2022/07/PVB_2021_Artigos.pdf",
                          "_blank"
                        )
                      }
                      className="group relative px-8 py-4 text-lg font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                        Ler Artigo Completo
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>
                </div>

                {/* Visual */}
                <div className="flex-shrink-0">
                  <div className="relative w-48 h-48 lg:w-64 lg:h-64 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl flex items-center justify-center">
                    <div className="text-6xl lg:text-8xl mb-4">📖</div>

                    {/* Floating Elements */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-orange-400 rounded-full opacity-20 animate-pulse"></div>
                    <div
                      className="absolute bottom-4 right-4 w-6 h-6 bg-yellow-400 rounded-full opacity-20 animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 8L56 0h2L40 18v-2zm0 8L64 8h2L40 26v-2zm0 8L72 16h2L40 34v-2zm0 8L80 24h2v2L42 42h-2zm-8 8L80 32h2v2L34 50h-2zm-8 8L80 40h2v2L26 58h-2zm-8 8L80 48h2v2L18 66h-2zm-8 8L80 56h2v2L10 74h-2zm-8 8L80 64h2v2L2 82h-2zm-8 8L80 72h2v2L-6 90h-2zm-8 8L80 80h2v2L-14 98h-2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-6 left-16 w-20 h-20 bg-orange-400 opacity-20 rounded-full blur-xl"></div>
        <div className="absolute bottom-6 right-16 w-16 h-16 bg-yellow-400 opacity-20 rounded-full blur-xl"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1 mb-4">
            <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium text-white">
              Junte-se à nossa comunidade!
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Faça a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 to-yellow-300">
              Diferença
            </span>{" "}
            Hoje
          </h2>

          <p className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto leading-relaxed">
            Conecte-se com organizações que precisam de ajuda ou encontre
            voluntários para sua causa. Juntos, podemos transformar vidas e
            construir um mundo melhor.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            {/* Voluntário Card */}
            <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 flex-1 flex flex-col">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Seja um Voluntário
              </h3>
              <p className="text-gray-300 mb-3 leading-relaxed text-sm flex-1">
                Encontre oportunidades de voluntariado que combinam com seus
                interesses e disponibilidade.
              </p>
              <button
                onClick={() => {
                  console.log("Botão de voluntário clicado");
                  window.dispatchEvent(
                    new CustomEvent("openLoginModal", {
                      detail: {
                        activeTab: "register",
                        userType: "volunteer",
                      },
                    })
                  );
                }}
                className="w-full group relative px-4 py-2 text-sm font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 text-gray-900 rounded-lg hover:from-orange-300 hover:to-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer z-10"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Cadastrar como Voluntário
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </button>
            </div>

            {/* ONG Card */}
            <div className="group relative bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 hover:bg-white/15 transition-all duration-300 flex-1 flex flex-col">
              <div className="text-3xl mb-3">🏢</div>
              <h3 className="text-lg font-bold text-white mb-2">
                Cadastre sua ONG
              </h3>
              <p className="text-gray-300 mb-3 leading-relaxed text-sm flex-1">
                Publique suas ações e encontre voluntários comprometidos com sua
                causa.
              </p>
              <button
                onClick={() => {
                  console.log("Botão de ONG clicado");
                  window.dispatchEvent(
                    new CustomEvent("openLoginModal", {
                      detail: {
                        activeTab: "register",
                        userType: "ong",
                      },
                    })
                  );
                }}
                className="w-full group relative px-4 py-2 text-sm font-semibold bg-gradient-to-r from-orange-400 to-yellow-400 text-gray-900 rounded-lg hover:from-orange-300 hover:to-yellow-300 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer z-10"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Cadastrar ONG
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-300 to-yellow-300 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Mais de 1.000 voluntários e 200 organizações já fazem parte da nossa
            comunidade.
          </p>
        </div>
      </section>

      {/* Article Modal */}
      {isModalOpen && selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                    {selectedArticle.image}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">
                      {selectedArticle.title}
                    </h2>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {selectedArticle.category}
                      </span>
                      <span className="text-sm opacity-90">
                        {selectedArticle.readTime}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-200px)] bg-gradient-to-br from-gray-50 to-white">
              <div className="max-w-4xl mx-auto">
                <style jsx>{`
                  .article-content h2 {
                    font-size: 2rem !important;
                    font-weight: bold !important;
                    color: #1f2937 !important;
                    margin: 2.5rem 0 1.5rem 0 !important;
                    padding: 1rem 1rem 1rem 1rem !important;
                    background: #fef3c7 !important;
                    border-left: 4px solid #f59e0b !important;
                    border-radius: 0 8px 8px 0 !important;
                  }
                  .article-content h3 {
                    font-size: 1.5rem !important;
                    font-weight: 600 !important;
                    color: #ea580c !important;
                    margin: 2rem 0 1rem 0 !important;
                  }
                  .article-content p {
                    font-size: 1.125rem !important;
                    line-height: 1.8 !important;
                    color: #374151 !important;
                    margin-bottom: 1.5rem !important;
                  }
                  .article-content blockquote {
                    border-left: 4px solid #f59e0b !important;
                    background: #fef3c7 !important;
                    padding: 1rem 1rem 1rem 1rem !important;
                    border-radius: 0 8px 8px 0 !important;
                    font-style: italic !important;
                    margin: 1.5rem 0 !important;
                  }
                  .article-content ul {
                    margin: 1.5rem 0 !important;
                  }
                  .article-content li {
                    font-size: 1.125rem !important;
                    margin-bottom: 0.75rem !important;
                    color: #374151 !important;
                  }
                  .article-content strong {
                    color: #1f2937 !important;
                    font-weight: 600 !important;
                  }
                `}</style>
                <div
                  className="article-content"
                  dangerouslySetInnerHTML={{
                    __html:
                      selectedArticle.fullContent ||
                      `
                    <h2>Conteúdo em Desenvolvimento</h2>
                    <p>Este artigo está sendo desenvolvido e em breve terá conteúdo completo. Por enquanto, aqui está uma prévia:</p>
                    <p>${selectedArticle.description}</p>
                    <p>Volte em breve para ler o artigo completo!</p>
                  `,
                  }}
                />

                {/* Decorative Elements */}
                <div className="mt-8 pt-6 border-t border-orange-200">
                  <div className="flex items-center justify-center gap-2 text-orange-600">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-orange-300 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
