
export interface ILink {
    name: string;
    path: string;
    element: React.ComponentType<any>;
    subElement?: React.ComponentType<any> | any;
    icon?: string;
    iconActive?: string;
    subMenu?: ILink[];
}

const Links: ILink[] = [
    
];


export default Links;