import React from 'react';
import MenuFormCss from './MenuForm.css'
const DisplayJSON = ({data}) => {
    return(
    
    <div id="Menu">
        <nav id="Opciones">
            <ul>
                {data.map(item => (
                item.submenu && item.submenu.length !== 0 ? (
                    <li className='a_sub-Menu'>
                    <a id={item.id} href={item.enlace}>{item.nombre}</a>
                    <div className='subMenu'>
                        <nav className='nav_submenu'>
                        {
                            item.submenu.length !== 0 && item.submenu.map(item_2 => (
                            <a id={item_2.id} href={item_2.enlace}>{item_2.nombre}</a>
                            ))
                        }
                        </nav>
                    </div>
                    </li>
                ) :<li>
                    <a href={item.enlace}>{item.nombre}</a>
                    </li>
                ))}
            </ul>
        </nav>
    </div>
    
    )
}

export default DisplayJSON;