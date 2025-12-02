import notificationsService from "../services/notificationsService";

// Utilitários para criar notificações automaticamente
export const createSystemNotification = async (notificationData) => {
  try {
    const notification = await notificationsService.createTestNotification(
      notificationData
    );
    return notification;
  } catch (error) {
    console.error("Erro ao criar notificação do sistema:", error);
    return null;
  }
};

// Notificações para candidaturas
export const notifyApplicationSubmitted = async (
  volunteerName,
  actionTitle,
  ongId
) => {
  return await createSystemNotification({
    type: "new_application",
    title: "Nova Candidatura Recebida",
    message: `${volunteerName} se candidatou para a ação "${actionTitle}".`,
    priority: "normal",
    data: {
      ongId,
      actionTitle,
      category: "application",
    },
  });
};

export const notifyApplicationStatusChange = async (
  volunteerId,
  actionTitle,
  status,
  ongResponse = ""
) => {
  const statusMessages = {
    approved: "Sua candidatura foi aprovada!",
    rejected: "Sua candidatura foi rejeitada.",
    withdrawn: "Sua candidatura foi cancelada.",
    completed: "Ação concluída com sucesso!",
  };

  const message =
    statusMessages[status] || "O status da sua candidatura foi alterado.";
  const fullMessage = ongResponse
    ? `${message} Resposta da ONG: ${ongResponse}`
    : message;

  return await createSystemNotification({
    type: "application_status_change",
    title: "Status da Candidatura Atualizado",
    message: fullMessage,
    priority: status === "approved" ? "high" : "normal",
    data: {
      volunteerId,
      actionTitle,
      status,
      ongResponse,
      category: "application",
    },
  });
};

// Notificações para ações
export const notifyActionReminder = async (
  userId,
  actionTitle,
  actionDate,
  hoursBefore = 24
) => {
  const timeText = hoursBefore === 1 ? "1 hora" : `${hoursBefore} horas`;

  return await createSystemNotification({
    type: "action_reminder",
    title: "Lembrete de Ação",
    message: `A ação "${actionTitle}" acontece em ${timeText}. Não se esqueça!`,
    priority: hoursBefore <= 1 ? "urgent" : "high",
    data: {
      actionTitle,
      actionDate,
      reminderTime: new Date(),
      category: "action",
    },
  });
};

export const notifyActionCancelled = async (
  userId,
  actionTitle,
  reason = ""
) => {
  const message = reason
    ? `A ação "${actionTitle}" foi cancelada. Motivo: ${reason}`
    : `A ação "${actionTitle}" foi cancelada.`;

  return await createSystemNotification({
    type: "action_cancelled",
    title: "Ação Cancelada",
    message,
    priority: "high",
    data: {
      actionTitle,
      reason,
      category: "action",
    },
  });
};

export const notifyActionUpdated = async (
  userId,
  actionTitle,
  changes = []
) => {
  const changesText =
    changes.length > 0
      ? `Alterações: ${changes.join(", ")}`
      : "Detalhes foram atualizados.";

  return await createSystemNotification({
    type: "action_updated",
    title: "Ação Atualizada",
    message: `A ação "${actionTitle}" foi atualizada. ${changesText}`,
    priority: "normal",
    data: {
      actionTitle,
      changes,
      category: "action",
    },
  });
};

// Notificações para mensagens
export const notifyNewMessage = async (
  recipientId,
  senderName,
  messagePreview
) => {
  return await createSystemNotification({
    type: "new_message",
    title: "Nova Mensagem",
    message: `${senderName} enviou uma mensagem: ${messagePreview}`,
    priority: "normal",
    data: {
      senderName,
      messagePreview,
      category: "message",
    },
  });
};

// Notificações do sistema
export const notifySystemAnnouncement = async (
  title,
  message,
  priority = "normal"
) => {
  return await createSystemNotification({
    type: "system_announcement",
    title,
    message,
    priority,
    data: {
      category: "system",
    },
  });
};

export const notifyWelcome = async (userId, userName, userType) => {
  const welcomeMessage =
    userType === "volunteer"
      ? `Bem-vindo(a) à plataforma, ${userName}! Comece explorando as ações disponíveis.`
      : `Bem-vindo(a) à plataforma, ${userName}! Sua ONG foi registrada com sucesso.`;

  return await createSystemNotification({
    type: "welcome_message",
    title: "Bem-vindo(a)!",
    message: welcomeMessage,
    priority: "normal",
    data: {
      userName,
      userType,
      category: "system",
    },
  });
};

// Notificações para conquistas
export const notifyAchievementUnlocked = async (
  userId,
  achievementName,
  description
) => {
  return await createSystemNotification({
    type: "achievement_unlocked",
    title: "🏆 Conquista Desbloqueada!",
    message: `Parabéns! Você desbloqueou: ${achievementName}. ${description}`,
    priority: "high",
    data: {
      achievementName,
      description,
      category: "achievement",
    },
  });
};

export const notifyVolunteerHoursMilestone = async (
  userId,
  hours,
  milestone
) => {
  return await createSystemNotification({
    type: "volunteer_hours_milestone",
    title: "⭐ Marco de Horas Atingido!",
    message: `Parabéns! Você atingiu ${hours} horas de voluntariado. ${milestone}`,
    priority: "high",
    data: {
      hours,
      milestone,
      category: "achievement",
    },
  });
};

// Notificações para verificação de ONG
export const notifyONGVerification = async (ongId, ongName, status) => {
  const statusMessages = {
    pending: "Sua ONG está em processo de verificação.",
    approved: "Parabéns! Sua ONG foi verificada com sucesso.",
    rejected: "Sua ONG não foi aprovada na verificação.",
  };

  return await createSystemNotification({
    type: "ong_verification",
    title: "Status da Verificação da ONG",
    message:
      statusMessages[status] ||
      "O status da verificação da sua ONG foi alterado.",
    priority: status === "approved" ? "high" : "normal",
    data: {
      ongName,
      status,
      category: "system",
    },
  });
};

// Função para criar notificação de teste baseada no tipo
export const createTestNotificationByType = async (type) => {
  const testNotifications = {
    application_status_change: {
      title: "Status da Candidatura Atualizado",
      message:
        'Sua candidatura para "Distribuição de Alimentos" foi aprovada! A ONG entrará em contato em breve.',
      priority: "high",
    },
    new_application: {
      title: "Nova Candidatura Recebida",
      message:
        'João Silva se candidatou para a ação "Distribuição de Alimentos".',
      priority: "normal",
    },
    action_reminder: {
      title: "Lembrete de Ação",
      message:
        'A ação "Distribuição de Alimentos" acontece em 1 hora. Não se esqueça!',
      priority: "urgent",
    },
    system_announcement: {
      title: "Manutenção Programada",
      message:
        "O sistema estará em manutenção hoje às 23h. Pedimos desculpas pelo transtorno.",
      priority: "high",
    },
    achievement_unlocked: {
      title: "🏆 Conquista Desbloqueada!",
      message:
        'Parabéns! Você desbloqueou: "Primeiro Voluntário". Continue assim!',
      priority: "high",
    },
  };

  const notificationData = testNotifications[type] || {
    title: "Notificação de Teste",
    message: "Esta é uma notificação de teste do sistema.",
    priority: "normal",
  };

  return await createSystemNotification({
    type,
    ...notificationData,
  });
};

// Função para criar múltiplas notificações de teste
export const createMultipleTestNotifications = async (count = 5) => {
  const types = [
    "application_status_change",
    "new_application",
    "action_reminder",
    "system_announcement",
    "achievement_unlocked",
  ];

  const notifications = [];

  for (let i = 0; i < count; i++) {
    const type = types[i % types.length];
    const notification = await createTestNotificationByType(type);
    if (notification) {
      notifications.push(notification);
    }

    // Pequeno delay para evitar sobrecarga
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  return notifications;
};
