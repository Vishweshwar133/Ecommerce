import React from 'react'
import { Link } from 'react-router-dom'
import { SidebarData } from './SidebarData'
import { NavLink } from 'react-router-dom'
function Sidebar() {
    return (
        <div className='Sidebar'>
            <ul className='SidebarList'>
                {SidebarData.map((val, key) => {
                    return (
                            <NavLink to={val.link} exact key={key} className="Row" activeClassName="active">
                                <div id="icon">{val.icon}</div>
                                <div id="title">{val.title}</div>
                            </NavLink>
                    )



                })}

            </ul>
        </div>
    )
}

export default Sidebar