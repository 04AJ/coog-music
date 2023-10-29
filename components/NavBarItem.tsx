import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface NavBarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
    visible: boolean;
}

const NavBarItem: React.FC<NavBarItemProps> = ({
    icon: Icon,
    label,
    active,
    href,
    visible
}) => {
    return (
        <Link
            href={href}
            className={twMerge(`
        ${(visible) ? 'visible' : 'invisible'}
        flex 
        flex-row 
        h-auto 
        items-center 
        w-full 
        gap-x-4 
        text-md 
        font-medium
        cursor-pointer
        hover:text-white
        transition
        text-neutral-400
        py-1`,
                active && "text-white"
            )
            }
        >
            <Icon size={26} />
            <p className="truncate w-100">{label}</p>
        </Link>
    );
}

export default NavBarItem;