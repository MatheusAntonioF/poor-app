import type { CategoryType } from '@/src/server/models/categories.model';
import { Chip } from '@heroui/react';
import {
    BadgeHelp,
    BusFront,
    CheckIcon,
    FerrisWheel,
    HeartPulse,
    House,
    Library,
    Utensils,
} from 'lucide-react';

interface CategoryBadgeProps {
    categoryType: CategoryType;
}

const variants = {
    Moradia: {
        palette: 'bg-gradient-to-br from-red-500 to-amber-500',
        Icon: House,
    },
    Alimentação: {
        palette: 'bg-gradient-to-br from-yellow-500 to-green-500',
        Icon: Utensils,
    },
    Transporte: {
        palette: 'bg-gradient-to-br from-emerald-500 to-cyan-500',
        Icon: BusFront,
    },
    Saúde: {
        palette: 'bg-gradient-to-br from-sky-500 to-indigo-500',
        Icon: HeartPulse,
    },
    Lazer: {
        palette: 'bg-gradient-to-br from-violet-500 to-fuchsia-500',
        Icon: FerrisWheel,
    },
    Educação: {
        palette: 'bg-gradient-to-br from-pink-500 to-rose-500',
        Icon: Library,
    },
    Outros: {
        palette: 'bg-gradient-to-br from-rose-500 to-neutral-500',
        Icon: BadgeHelp,
    },
};

export function CategoryBadge({ categoryType }: CategoryBadgeProps) {
    const { palette, Icon } = variants[categoryType];

    return (
        <Chip
            classNames={{
                base: palette,
                content: 'drop-shadow shadow-black text-white',
            }}
            startContent={<Icon size={18} className="ml-1" />}
        >
            {categoryType}
        </Chip>
    );
}
