import React, { Component, PropTypes } from 'react';

import Navbar from './Navbar';
import PageContent from './PageContent';

class TranslationPage extends Component {
  render () {
    const { id } = this.props.match.params;
    const actionType = 'menu';

    const company = {
        name: 'Cafe Mediterranean',
        description: '',
        logo: {
          imgPath: 'assets/images/logo-cafe-med-white.png',
          altDesc: 'The Cafe Mediterranean Logo'
        },
        website: 'http://thecafemediterranean.com',
        tel: '+63-917-842-5222',
        email: 'contact@thecafemediterranean.com',
        social: {
          twitter: 'https://twitter.com/thecafemediterranean',
          facebook: 'https://facebook.com/thecafemediterranean',
          instagram: 'https://instagram.com/thecafemediterranean'
        },
        branchRoot: {
          contact: {
            name: {
              first: 'Marla',
              last: 'Moran'
            },
            avatar: {
              imgPath: 'assets/images/avatar-admin@2x.png',
              altDesc: 'Image of Marla Moran'
            },
            tel: '+63-917-842-5222',
            email: 'marla@thecafemediterranean.com'
          }
        }
    };

    const sections = [{
        type: actionType,
        title: "Menu " + id,
        articles: [{
          type: "menus",
          title: "Menu",
          component: {
            type: "Menus",
            title: "",
            props: {
              menus: [
                {
                  id: 2,
                  title: "Menu d'été",
                  description: "Des saveurs estivales, provencales et fraîches",
                  price: 30.99,
                  dateUpdate: {
                    date: "2017-06-15 10:47:58"
                  },
                  translations: [

                  ],
                  languages: [
                    {
                      id: 1,
                      code: "de",
                      codeFull: "de-CH",
                      title: "Swiss_German",
                      name: "German (Switzerland)",
                      flag: {
                        id: 1,
                        title: "Germany Flag",
                        imgPath: "",
                        altDesc: "Image of the Germany flag"
                      }
                    }
                  ],
                  categories: [
                    {
                      id: 2,
                      isCustom: false,
                      title: "Starters",
                      description: "First meal of the menu",
                      meals: [
                        {
                          id: 1,
                          title: "Carpaccio de saumon au citron confit et aneth",
                          description: "Saumon sauvage de Norvège pêché à l'ours domestique suivant une technique ancestrale",
                          enableDetails: false,
                          detail: {}
                        },
                        {
                          id: 2,
                          title: "Escargots à la Douzaine",
                          description: "Escargots et sa traditionelle sauce au beurre persillé",
                          enableDetails: false,
                          detail: {}
                        },
                        {
                          id: 3,
                          title: "Pâté en croûte maison",
                          description: "",
                          enableDetails: false,
                          detail: {}
                        }
                      ]
                    },
                    {
                      id: 3,
                      isCustom: false,
                      title: "Mains",
                      description: "Main meal of the menu",
                      meals: [
                        {
                          id: 4,
                          title: "Boeuf bourguignon",
                          description: "",
                          enableDetails: false,
                          detail: {}
                        },
                        {
                          id: 5,
                          title: "Coq au vin",
                          description: "",
                          enableDetails: false,
                          detail: {}
                        },
                        {
                          id: 6,
                          title: "Escalope de poulet et sa julienne de légumes",
                          description: "",
                          enableDetails: false,
                          detail: {}
                        }
                      ]
                    },
                    {
                      id: 4,
                      isCustom: false,
                      title: "Desserts",
                      description: "last meal of the menu",
                      meals: [
                        {
                          id: 7,
                          title: "Charlotte aux framboises maison",
                          description: "",
                          enableDetails: false,
                          detail: {}
                        },
                        {
                          id: 8,
                          title: "Eclair à la pistache, éclats de noix de coco",
                          description: "",
                          enableDetails: false,
                          detail: {}
                        },
                        {
                          id: 9,
                          title: "Salade de fruits frais",
                          description: "",
                          enableDetails: false,
                          detail: {}
                        }
                      ]
                    }
                  ]
                }
              ],
            }
          }
        }]
    }];

    const asideType = 'preview';


    return (
      <div>
        <Navbar logo={company.logo} />
        <PageContent sections={sections} asideType={asideType} company={company} />
      </div>
    )
  }
};

export default TranslationPage;
