const express = require("express");
const { body, validationResult, query } = require("express-validator");
const auth = require("../middleware/auth");

const router = express.Router();

const contentData = [
  {
    id: "1",
    type: "article",
    title: "Como se tornar um voluntário eficaz",
    summary:
      "Dicas essenciais para quem quer começar no voluntariado e fazer a diferença na comunidade.",
    content: `
      <h2>Introdução ao Voluntariado</h2>
      <p>O voluntariado é uma das formas mais gratificantes de contribuir para a sociedade. 
      Não apenas ajuda outras pessoas, mas também desenvolve habilidades pessoais e profissionais.</p>
      
      <h3>Passos para começar:</h3>
      <ul>
        <li>Identifique suas habilidades e interesses</li>
        <li>Pesquise organizações na sua área</li>
        <li>Comece com pequenos compromissos</li>
        <li>Mantenha-se consistente</li>
      </ul>
      
      <h3>Benefícios do voluntariado:</h3>
      <ul>
        <li>Desenvolvimento de habilidades</li>
        <li>Networking e conexões</li>
        <li>Satisfação pessoal</li>
        <li>Experiência profissional</li>
      </ul>
    `,
    author: "Equipe Voluntariado",
    publishDate: "2024-01-15",
    tags: ["voluntariado", "dicas", "iniciantes"],
    readTime: "5 min",
    image: "/images/volunteer-tips.jpg",
  },
  {
    id: "2",
    type: "guide",
    title: "Guia completo para ONGs: Gerenciando voluntários",
    summary:
      "Estratégias e melhores práticas para organizações gerenciarem seus programas de voluntariado.",
    content: `
      <h2>Gestão Eficaz de Voluntários</h2>
      <p>Uma ONG bem-sucedida depende de um programa de voluntariado bem estruturado. 
      Este guia oferece insights valiosos para organizações que querem otimizar seus esforços.</p>
      
      <h3>Estrutura do programa:</h3>
      <ul>
        <li>Definir objetivos claros</li>
        <li>Criar processos de recrutamento</li>
        <li>Implementar treinamento adequado</li>
        <li>Estabelecer sistema de reconhecimento</li>
      </ul>
      
      <h3>Retenção de voluntários:</h3>
      <ul>
        <li>Comunicação regular</li>
        <li>Feedback construtivo</li>
        <li>Oportunidades de crescimento</li>
        <li>Celebração de conquistas</li>
      </ul>
    `,
    author: "Especialistas em Terceiro Setor",
    publishDate: "2024-01-10",
    tags: ["ong", "gestão", "voluntários"],
    readTime: "8 min",
    image: "/images/ong-management.jpg",
  },
  {
    id: "3",
    type: "testimonial",
    title: "Histórias inspiradoras de voluntários",
    summary:
      "Depoimentos emocionantes de pessoas que transformaram vidas através do voluntariado.",
    content: `
      <h2>Transformando Vidas Através do Voluntariado</h2>
      
      <div class="testimonial">
        <h3>Maria Silva - Voluntária há 5 anos</h3>
        <p>"Comecei a voluntariar após me aposentar. O que começou como uma forma de ocupar o tempo 
        se tornou minha paixão. Ver o sorriso das crianças que ajudo é indescritível."</p>
      </div>
      
      <div class="testimonial">
        <h3>João Santos - Voluntário de tecnologia</h3>
        <p>"Sempre trabalhei com TI, mas nunca me senti tão realizado como quando ensino programação 
        para jovens de comunidades carentes. É incrível ver o potencial que eles têm."</p>
      </div>
      
      <div class="testimonial">
        <h3>Ana Costa - Coordenadora de voluntários</h3>
        <p>"Coordeno um grupo de 50 voluntários e cada um tem uma história única. 
        O voluntariado não só ajuda quem recebe, mas transforma quem doa seu tempo."</p>
      </div>
    `,
    author: "Comunidade Voluntariado",
    publishDate: "2024-01-05",
    tags: ["depoimentos", "inspiração", "histórias"],
    readTime: "6 min",
    image: "/images/inspiring-stories.jpg",
  },
  {
    id: "4",
    type: "article",
    title: "Voluntariado corporativo: Benefícios para empresas e funcionários",
    summary:
      "Como programas de voluntariado corporativo podem fortalecer equipes e melhorar a reputação da empresa.",
    content: `
      <h2>Voluntariado Corporativo</h2>
      <p>Empresas que investem em programas de voluntariado corporativo colhem benefícios 
      que vão além da responsabilidade social.</p>
      
      <h3>Benefícios para a empresa:</h3>
      <ul>
        <li>Melhoria da reputação da marca</li>
        <li>Maior engajamento dos funcionários</li>
        <li>Desenvolvimento de liderança</li>
        <li>Fortalecimento da cultura organizacional</li>
      </ul>
      
      <h3>Benefícios para os funcionários:</h3>
      <ul>
        <li>Desenvolvimento de habilidades</li>
        <li>Maior satisfação no trabalho</li>
        <li>Networking interno e externo</li>
        <li>Senso de propósito</li>
      </ul>
      
      <h3>Implementação:</h3>
      <ul>
        <li>Definir objetivos alinhados aos valores da empresa</li>
        <li>Criar políticas claras de participação</li>
        <li>Oferecer flexibilidade de horários</li>
        <li>Reconhecer e celebrar participações</li>
      </ul>
    `,
    author: "Consultores em Responsabilidade Social",
    publishDate: "2024-01-01",
    tags: ["corporativo", "empresas", "funcionários"],
    readTime: "7 min",
    image: "/images/corporate-volunteering.jpg",
  },
];

router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 20 }),
    query("type").optional().isIn(["article", "guide", "testimonial", "video"]),
    query("search").optional().trim().isLength({ min: 2 }),
    query("tags").optional().isArray(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { page = 1, limit = 12, type, search, tags } = req.query;

      let filteredContent = [...contentData];

      if (type) {
        filteredContent = filteredContent.filter((item) => item.type === type);
      }

      if (search) {
        filteredContent = filteredContent.filter(
          (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.summary.toLowerCase().includes(search.toLowerCase()) ||
            item.content.toLowerCase().includes(search.toLowerCase())
        );
      }

      if (tags && tags.length > 0) {
        filteredContent = filteredContent.filter((item) =>
          tags.some((tag) => item.tags.includes(tag))
        );
      }

      filteredContent.sort(
        (a, b) => new Date(b.publishDate) - new Date(a.publishDate)
      );

      const total = filteredContent.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedContent = filteredContent.slice(startIndex, endIndex);

      res.json({
        content: paginatedContent,
        pagination: {
          current: parseInt(page),
          total: totalPages,
          totalItems: total,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      console.error("Erro ao buscar conteúdo:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

router.get("/:id", async (req, res) => {
  try {
    const content = contentData.find((item) => item.id === req.params.id);

    if (!content) {
      return res.status(404).json({ message: "Conteúdo não encontrado" });
    }

    res.json({ content });
  } catch (error) {
    console.error("Erro ao buscar conteúdo:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/types", async (req, res) => {
  try {
    const types = [
      {
        id: "article",
        name: "Artigos",
        count: contentData.filter((item) => item.type === "article").length,
      },
      {
        id: "guide",
        name: "Guias",
        count: contentData.filter((item) => item.type === "guide").length,
      },
      {
        id: "testimonial",
        name: "Depoimentos",
        count: contentData.filter((item) => item.type === "testimonial").length,
      },
    ];

    res.json({ types });
  } catch (error) {
    console.error("Erro ao buscar tipos de conteúdo:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/tags", async (req, res) => {
  try {
    const allTags = contentData.reduce((tags, item) => {
      item.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
      return tags;
    }, []);

    const tagsWithCount = allTags.map((tag) => ({
      name: tag,
      count: contentData.filter((item) => item.tags.includes(tag)).length,
    }));

    tagsWithCount.sort((a, b) => b.count - a.count);

    res.json({ tags: tagsWithCount });
  } catch (error) {
    console.error("Erro ao buscar tags:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get("/featured", async (req, res) => {
  try {
    const featuredContent = contentData
      .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))
      .slice(0, 3);

    res.json({ featuredContent });
  } catch (error) {
    console.error("Erro ao buscar conteúdo em destaque:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
});

router.get(
  "/search",
  [
    query("q").notEmpty().withMessage("Termo de busca é obrigatório"),
    query("page").optional().isInt({ min: 1 }),
    query("limit").optional().isInt({ min: 1, max: 20 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { q, page = 1, limit = 12 } = req.query;

      const searchResults = contentData.filter(
        (item) =>
          item.title.toLowerCase().includes(q.toLowerCase()) ||
          item.summary.toLowerCase().includes(q.toLowerCase()) ||
          item.content.toLowerCase().includes(q.toLowerCase()) ||
          item.tags.some((tag) => tag.toLowerCase().includes(q.toLowerCase()))
      );

      searchResults.sort((a, b) => {
        const aTitle = a.title.toLowerCase().includes(q.toLowerCase());
        const bTitle = b.title.toLowerCase().includes(q.toLowerCase());

        if (aTitle && !bTitle) return -1;
        if (!aTitle && bTitle) return 1;

        return new Date(b.publishDate) - new Date(a.publishDate);
      });

      const total = searchResults.length;
      const totalPages = Math.ceil(total / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + parseInt(limit);
      const paginatedResults = searchResults.slice(startIndex, endIndex);

      res.json({
        query: q,
        results: paginatedResults,
        pagination: {
          current: parseInt(page),
          total: totalPages,
          totalItems: total,
          hasNext: page < totalPages,
          hasPrev: page > 1,
        },
      });
    } catch (error) {
      console.error("Erro na busca:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
);

module.exports = router;
