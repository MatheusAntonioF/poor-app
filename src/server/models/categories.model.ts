export const CATEGORY_TYPES = {
    Moradia: 'MORADIA',
    Alimentação: 'ALIMENTACAO',
    Transporte: 'TRANSPORTE',
    Saúde: 'SAUDE',
    Lazer: 'LAZER',
    Educação: 'EDUCACAO',
    Outros: 'OUTROS',
};

export type CategoryType = keyof typeof CATEGORY_TYPES;

export const categories = [
    {
        name: 'Moradia',
        description: '(aluguel, contas de água, luz, internet, etc.)',
    },
    {
        name: 'Alimentação',
        description: '(supermercado, restaurantes, delivery)',
    },
    {
        name: 'Transporte',
        description: '(combustível, transporte público, manutenção do carro)',
    },
    {
        name: 'Saúde',
        description: '(plano de saúde, remédios, consultas)',
    },
    {
        name: 'Lazer',
        description: '(cinema, viagens, hobbies, saídas)',
    },
    {
        name: 'Educação',
        description: '(cursos, livros, materiais)',
    },
    {
        name: 'Outros',
        description: '(roupas, presentes, despesas diversas)',
    },
];
