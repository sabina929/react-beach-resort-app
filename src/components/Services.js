import React, { Component } from 'react';
import Title from "./Title";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";

export default class Services extends Component {
  state={
    services: [
      {
        icon: <FaCocktail/>,
        title: "Free Cocktails",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      },
      {
        icon: <FaHiking/>,
        title: "Endless Hiking",
        info: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      },
      {
        icon: <FaShuttleVan/>,
        title: "Free Shuttle",
        info: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
      },
      {
        icon: <FaBeer/>,
        title: "Strongest Beer",
        info: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      }
    ]
  }
  render() {
    return (
      <section className="services">
               <Title title="services"/>
               <div className="services-center">
                   {
      this.state.services.map((service, i) => {
        return (
          <article key={i} className="service">
                                    <span>{service.icon}</span>
                                    <h6>{service.title}</h6>
                                    <p>{service.info}</p>
                                </article>
        )
      })
      }
               </div>
      </section>
    )
  }
}
