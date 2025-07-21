import { useEffect, useState } from 'react';

type ScreenWrapperProps = {
    children: React.ReactNode;
};

const ScreenWrapper = ({ children }: ScreenWrapperProps) => {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Ejemplo de advertencia para pantallas muy pequeñas
    if (screenWidth < 320) {
        return (
            <div className="flex items-center justify-center h-screen text-center">
                <p className="text-red-600 font-semibold">
                    Tu pantalla es muy pequeña para visualizar correctamente esta aplicación 😥
                </p>
            </div>
        );
    }

    // Aquí podrías usar el tamaño para condicionar layouts, estilos, etc.
    return <div className="min-h-screen" style={{ margin: 'auto', display: 'flex', justifyContent: 'center', padding: '16px' }}>{children}</div>;
};

export default ScreenWrapper;