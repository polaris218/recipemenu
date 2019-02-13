import React, { Component, PropTypes } from 'react';

import LoginHeader from './LoginHeader';
import LoginContent from './LoginContent';
import { Link } from 'react-router-dom';
const cookies = true;
class Terms extends Component {
  constructor(props) {
    super(props);
    this.state ={
      cookies:true
    }
}
  gotit(){
    this.setState({cookies:!this.state.cookies})  }
  render () {
    const { dispatch } = this.props;

    const images = [];

    return (
      <div className="global-container layout--login">
        <header id="header" className="header--small">
          <a className="main-logo" href="http://one-menu.com">
            <img src="assets/images/logo-one-menu-white.svg" alt="ONE-MENU Logo" />
          </a>
        </header>

        <main id="main" className="main clearfix">
          <div className="giant-image">
            <div className="overlay overlay--yellow"></div>
            <img src="assets/images/img-giant-image-2.jpg" alt="One Menu Restaurant" />
          </div>
        </main>
        <div className="termsText" style={{position:"absolute", top:"8rem", zIndex:"600", color:"black", "padding":"2rem", "height":"75vh", "overflow":"scroll", "paddingBottom": "0px"}}>
            <h3>TERMS AND CONDITIONS</h3>
            <p>ONE-MENU is the first free app for translation of worldwide food menus provided by ONE-MENU Limited (“ONE-MENU Ltd”). Using ONE-MENU immediately translates Restaurant& Hotel menus into the user’s languages of choice.</p>
            <ol>
                <li>
                    <p><b>Description of the Services</b></p>
                    <p>ONE-MENU is a free mobile application providing automatic translation of menus submitted into the user’s language of choice and also offers business placement, GPS and filtered enable search feature, menu item explanations, share feature, video menu integration, analytics and statistics, support and feedback (the « Service(s) »).</p>
                    <p>ONE-MENU is able to translate the menus submitted (the « Menu(s) ») from a minimum of three to up to 100 different global languages in order to provide ONE-MENU users with translated version of the Menus (the « Translated Menu(s) »).</p>
                    <p>ONE-MENU could provide a badge that Hotels & Restaurants can feature on their door a ONE- MENU badge that enables users nearby to know that they could walk in and have access to the Translated Menus.</p>
                    <p>Users will use ONE-MENU to source a list of participating restaurants in each city. They can use ONE-MENU to read Translated Menus, even before going to the restaurant of their choice.</p>
                </li>
                <li>
                    <p><b>Acceptance of Terms and Conditions</b></p>
                    <p>ONE-MENU Ltd provide the mobile application ONE-MENU and the Services subject to your compliance with these terms, conditions, and notices contained or referenced herein (the « Terms and Conditions »), as well as any other written agreement between ONE-MENU Ltd and you.</p>
                    <p>In addition, while using ONE-MENU Services, you shall be subject to any posted guidelines or rules applicable to such Services in addition to those in these Terms and Conditions. All such guidelines or rules are hereby incorporated by reference into these Terms and Conditions.</p>
                    <p>By completing any registration process with ONE-MENU or submitting Menus, you agree to be bound by these Terms and Conditions.</p>
                    <p>If you do not wish to be bound by these Terms and Conditions, please discontinue use of ONE- MENU immediately.</p> 
                    <p>Your remedy for dissatisfaction with ONE-MENU, or any Services, content, or other information available on or through ONE-MENU, is to stop using ONE-MENU and/or those Services.</p>
                    <p>Your agreement with us regarding compliance with these Terms and Conditions becomes effective immediately upon commencement of your use of ONE-MENU</p>
                </li>
                <li>
                    <p><b>Access to ONE-MENU</b></p>
                    <p>To access ONE-MENU, you may be asked to provide certain registration details or other information.</p>
                    <p>It is a condition of your use of ONE-MENU that all the information you provide will be correct, current, and complete and that you will abide by these Terms and Conditions. Should you wish to edit or modify your personal information you may do so via the Modify My Account facility bearing in mind that if ONE-MENU Ltd believes that the information you have provided is not correct, current, or complete; or that you have violated any provision in these Terms and Conditions, ONE-MENU Ltd has the right to refuse you access to ONE-MENU, to suspend your access to any of ONE-MENU’s Services, or to temporarily suspend or permanently delete your account.</p>
                    <p>Users may also access ONE-MENU via their twitter and Facebook accounts.</p>
                    <p>If you choose, or are provided with, a user name, password or any other piece of information as part of our security procedures, you must treat such information as confidential, and you must not disclose it to any other person or entity. You also acknowledge that your account is personal to you (or your company) and agree not to provide any other person with access to ONE-MENU or portions of it using your user name, password or other security information. You agree to notify us immediately of any unauthorized access to or use of your username or password or any other breach of security. You also agree to ensure that you have logged out correctly from your account at the end of each session.</p>
                    <p></p>
                </li>
                <li>
                    <p><b>License</b></p>
                    <p>During the term of your subscription, and subject to your compliance with these Terms and
                    Conditions, ONE-MENU Ltd provides you a non-exclusive, non-transferable, non-sublicensable,
                    revocable, worldwide license to access and use ONE-MENU and its content.
                    </p>
                    <p>During the term of your subscription, you grant to (i) ONE-MENU Ltd a worldwide, non-
                    exclusive, royalty-free license, with the right to copy, use, sublicense, adapt, modify, distribute,
                    publicly display, publicly perform, transmit, stream, broadcast, make available, communicate to
                    the public and otherwise use and exploit such Menus, through or by means of ONE-MENU and
                    to (ii) the user a worldwide, non-exclusive, royalty-free license, with the right to copy only for
                    personal use, use, transmit, make available, communicate to other users and otherwise use and
                    exploit such Menus, through or by means of ONE-MENU.</p>
                </li>
                <li>
                    <p><b>Restrictions of Use</b></p>
                    <p>You may use ONE-MENU for purposes expressly permitted by these Terms and Conditions.</p>
                    <p>As a condition of your use of ONE-MENU and Services, you warrant to us that you will not use
                    ONE-MENU or Services for any purpose that is prohibited by these terms, conditions, and
                    notices and will do none of the following:
                    <ul>
                        <li><p>Post or store on ONE-MENU any software, information, data, databases, music, audio,
                        video or audiovisual files, photographs, images, documents text, digital files or other
                        material that violates or infringes anyone’s intellectual-property rights (including
                        copyrights, trademarks, trade secrets, patents, publicity rights or confidential ideas);</p>
                        </li>
                        <li><p>Conduct or promote any illegal activities while using ONE-MENU or Services;</p></li>
                        <li><p>Upload, distribute or print anything that may be harmful to minors;</p></li>
                        <li><p>Transmit any material which violates or infringes upon the rights of others, or is
                        unlawful;</p></li>
                        <li><p>Transmit any information that we believe to be, in our sole discretion, abusive,
                        excessively violent, harassing, defamatory, vulgar, obscene, lewd, lascivious, or
                        otherwise objectionable;</p></li>
                        <li><p>Attempt to reverse engineer or jeopardize the correct functioning of ONE-MENU or
                        Services, or otherwise attempt to derive the source code of the software (including the
                        tools, methods, processes, and infrastructure) that enables or underlies ONE-MENU;</p></li>
                        <li><p>Attempt to gain access to secured portions of ONE-MENU or Services to which you do
                        not possess access rights or obtain or attempt to obtain any materials, content, or
                        information through any means not intentionally made available or provided for through
                        ONE-MENU or Services;</p></li>
                        <li><p>Upload or transmit any form of virus, worm, Trojan horse, or other malicious code;</p></li>
                        <li><p>Use ONE-MENU or Services to generate unsolicited email advertisements or spam;</p></li>
                        <li><p>Use any automatic or manual process to harvest or scrape any information or content
                        from ONE-MENU or Services. Any scraping of content from ONE-MENU for any
                        reason, either through automated or manual means, is strictly prohibited;</p></li>
                        <li><p>Interfere in any way with the proper functioning of ONE-MENU and Services;</p></li>
                        <li><p>Use ONE-MENU or Services in any manner which could disable, overburden, damage,

                        or impair ONE-MENU or interfere with any other party’s use and enjoyment of ONE-
                        MENU;</p></li>
                        <li><p>Impersonate another user or an employee of ONE-MENU, or its partners or providers;</p></li>
                        <li><p>“Frame,” inline link or similarly display the ONE-MENU’s content or property without
                        the express prior written permission of an authorized representative of ONE-MENU Ltd;</p></li>
                        <li><p>Co-brand ONE-MENU without the express prior written permission of an authorized

                        representative of ONE-MENU Ltd. For purposes of these Terms and Conditions, “co-
                        branding” means to display a name, logo, trademark, or other means of attribution or

                        identification of any party in such a manner as is reasonably likely to give a user the

                        impression that such other party has the right to display, publish, or distribute ONE-
                        MENU or content accessible within ONE-MENU such as Menus or Translated Menus.</p></li>
                        </ul>
                        Should you engage in any of the prohibited activities set forth above, whether knowingly or
                        unwittingly, you agree to fully cooperate with ONE-MENU Ltd to ensure that such prohibited
                        activities should immediately cease.
                    </p>  
                </li>
                <li>
                    <p><b>Fees</b></p>
                    <p>If you subscribe to ONE-MENU, you agree to pay on a recurring monthly basis.</p>
                    <p>We will bill your credit card for all charges for Services on ONE-MENU. Recurring charges
                    shall be billed in advance of Service.</p>
                    <p>You agree to provide us with accurate and complete billing information as required for us to
                    process the fee, including, for example, valid credit card information, your name, address, and
                    telephone number, and to provide us with any changes in such information within 5 business
                    days of the change.</p>
                    <p>If, for any reason, your credit card company refuses to pay the amount billed for the Service, you
                    agree that we may, at our sole option, suspend or terminate your subscription to the Service and
                    require you to pay the overdue amount immediately by other means acceptable to us.</p>
                    <p>You agree that, until your subscription to the Service is terminated, you will continue to accrue
                    charges for which you remain responsible, even if you do not use the Service.</p>
                    <p>In the event that legal action is necessary to collect on balances due, you agree to reimburse us
                    for all expenses incurred to recover sums due, including attorney fees and other legal expenses.</p>
                </li>
                <li>
                    <p><b>ONE-MENU Ltd and third-party intellectual property rights</b></p>
                    <p>ONE-MENU Ltd retains all rights, title, and interest in and to the Services and any material
                    ONE-MENU Ltd makes available through ONE-MENU such as the Translated Menus. This
                    includes ONE-MENU name and logo, all related names, logos, product and service names,
                    designs and slogans and all copyrights, patents, trade secrets, trademarks, and other intellectual
                    property rights.</p>
                    <p>ONE-MENU does not claim ownership of the content of the Menus you submitted to the
                    Service. All your names, logos, product and service names, designs and slogans submitted
                    remain your sole property.</p>
                    <p>Menus and Translated Menus accessible from ONE-MENU is the proprietary information of
                    ONE-MENU LTD or the party that provided or licensed the Menus to ONE-MENU, whereby
                    such providing party retains all right, title, and interest in the Menus and/or the Translated
                    Menus.</p>
                    <p>You may not remove or alter, or cause to be removed or altered, any copyright, trademark, trade
                    name, service mark, or any other proprietary notice or legend appearing on any of the Menus or
                    Translated Menus. Modification or use of the Menus and Translated Menus except as expressly
                    provided in these Terms and Conditions violates ONE-MENU Ltd or the Menus provider’s
                    intellectual property rights. Neither title nor intellectual property rights are transferred to you by
                    access to ONE-MENU. Notwithstanding this provision, you are not permitted to use Menus and
                    Translated Menus of another Restaurant & Hotel as a component of, or basis for, a database
                    prepared for use by the said Restaurant & Hotel or any third party. Furthermore, all copies of

                    Menus and Translated Menus, whether in print or electronic form, must incorporate all of ONE-
                    MENU Ltd’s or third-party copyright and / or other intellectual property rights notices.</p>
                </li>
                <li>
                    <p><b>Term</b></p>
                    <p>These Terms and Conditions start on the date you accept it and will continue for a minimum
                    period of six (6) months without possibility of earlier termination. These Terms and Conditions
                    will continue until your subscription has expired, been cancelled or terminated.</p>
                </li>
                <li>
                    <p><b>Modifications and updates of Services</b></p>
                    <p>ONE-MENU and Services may need updates from time to time.</p>
                    <p>These updates may temporarily disrupt use of ONE-MENU or Services and are designed to
                    improve, enhance, and further develop ONE-MENU or Services and may take the form of bug
                    fixes, enhanced functions, new Service offerings, and updated Services.</p>
                    <p>You agree to receive such updates as part of your use of the Services.</p>
                </li>
                <li>
                    <p><b>Advertisement</b></p>
                    <p>Some of the Services may be supported by advertising revenue and may display advertisements
                    and promotions. The manner, mode, and extent of advertising by or permitted by us on ONE-
                    MENU are subject to change without specific notice to you. In consideration for our granting
                    you access to and use of ONE-MENU and Services, you agree that we may place such
                    advertising on ONE-MENU or Services.</p>
                </li>
                <li>
                    <p><b>Security and Privacy</b></p>
                    <p>ONE-MENU Ltd reserves the right to fully cooperate with any law enforcement authorities or
                    court order requesting or directing ONE-MENU to disclose the identity of anyone posting any e-
                    mail messages, or publishing or otherwise making available any materials that are believed to
                    violate these Terms and Conditions.</p>
                    <p>ONE-MENU, from time-to-time, may collect personally identifiable information (“Personal
                    Information"). This includes name, address, phone numbers, email addresses that you provide
                    and information collected electronically about how you use ONE-MENU.</p>
                    <p>ONE-MENU is committed to protecting the confidentially of all information entrusted to it by its
                    users. The Privacy Policy set out in the website www.one-menu.com governs all aspects of how
                    ONE-MENU LTD collects uses, maintains and discloses personal information from all users.</p>
                    <p>
                    BY ACCEPTING THESE TERMS AND CONDITIONS YOU WAIVE AND HOLD HARMLESS

                    ONE-MENU LTD FROM ANY CLAIMS RESULTING FROM ANY ACTION TAKEN BY ONE-
                    MENU DURING OR AS A RESULT OF ITS INVESTIGATIONS AND/OR FROM ANY ACTIONS

                    TAKEN AS A CONSEQUENCE OF INVESTIGATIONS BY EITHER ONE-MENU LTD OR LAW
                    ENFORCEMENT AUTHORITIES.
                    </p>
                </li>
                <li>
                    <p><b>Indemnity</b></p>
                    <p>You agree that all information or data of any kind related to the Menus, publicly or privately
                    provided, shall be your sole responsibility. ONE-MENU Ltd, its subsidiaries, affiliates, licensors,
                    content providers, service providers, employees, agents, officers, directors, and contractors (the
                    “Indemnified Parties”) shall not be responsible to you in any way for the content of Menus and
                    the Translated Menus that appear on ONE-MENU nor for any error or omission.</p>
                    <p>You will indemnify and hold ONE-MENU Ltd and the Indemnified Parties harmless from any
                    breach of these Terms and Conditions by you, including any use of Menus or Translated Menus
                    other than as expressly authorized in these Terms and Conditions and any content submitted by
                    you on ONE-MENU.</p>
                    <p>You agree that the Indemnified Parties will have no liability in connection with any such breach
                    or unauthorized use or submitted content, and you agree to indemnify any and all resulting loss,
                    damages, judgments, awards, costs, expenses, and attorneys’ fees of the Indemnified Parties in
                    connection therewith.</p>
                    <p>You will also indemnify and hold the Indemnified Parties harmless from and against any claims
                    brought by third parties arising out of your use of the information accessed from ONE-MENU
                    submitted by you.</p>
                </li>
                <li>
                    <p><b>No Warranty / Disclaimer</b></p>
                    <p>YOUR USE OF ONE-MENU IS AT YOUR OWN RISK.</p>
                    <p>THE TRANSLATED MENUS ARE PROVIDED “AS IS” AND WITHOUT WARRANTIES OF ANY
                    KIND, EITHER EXPRESSED OR IMPLIED.</p>
                    <p>Whilst ONE MENU endeavours to provide its clients with the highest quality and accuracy of
                    translation service it cannot 100% guarantee that TRANSLATED MENUS do not contain
                    TECHNICAL INACCURACIES OR TYPOGRAPHICAL ERRORS.</p>
                    <p>ONE-MENU LTD DISCLAIMS ALL WARRANTIES, INCLUDING ANY IMPLIED WARRANTIES

                    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, OR NON-
                    INFRINGEMENT.</p>
                    <p>We cannot GUARANTEE THAT THE FUNCTIONS OR CONTENT CONTAINED IN ONE-
                    MENU WILL BE UNINTERRUPTED OR ERROR-FREE, THAT DEFECTS WILL Be

                    automatically CORRECTED, OR THAT THIS APP OR THE SERVER THAT MAKES IT
                    AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</p>
                    <p>In the unlikely event that any loss or damange occurs to you or your property from the use of
                    ONE MENU or its content One Menu shall not be liable and the costs of any necessary
                    servicing, repair or correction shall be your responsibility.</p>
                    <p>SERVICE SUSPENSION: One Menu reserves the right to suspend or cease providing any
                    services relating to the apps published by it, with or without notice, and shall have no liability or
                    responsibility to you in any manner whatsoever if it chooses to do so.</p>
                    <p>ADVERTISERS IN THE APP: We accept no responsibility for adverts contained within the App.
                    If you agree to purchase goods and/or services from any third party who advertises in the App,
                    you do so at your own risk. The advertiser, not One Menu, is responsible for such goods and/or

                    services and if you have any queries or complaints in relation to them, your only recourse is
                    against the advertiser.</p>
                    <p>All of the information in ONE-MENU speaks only as of the date the information is posted on
                    ONE-MENU, and ONE-MENU Ltd does not undertake any obligation to update such
                    information after it is posted or to remove such information from ONE-MENU if it is not, or is
                    no longer accurate or complete.</p>
                </li>
                <li>
                    <p><b>Limitation of liability</b></p>
                    <p>ONE-MENU, ITS SUBSIDIARIES, AFFILIATES, LICENSORS, SERVICE PROVIDERS,
                    CONTENT PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, AND DIRECTORS WILL NOT
                    BE LIABLE FOR ANY INCIDENTAL, INDIRECT, PUNITIVE, ACTUAL, CONSEQUENTIAL,
                    SPECIAL, EXEMPLARY, PERSONAL INJURY (SUCH AS ALLERGY OR INTOXICATION) OR
                    OTHER DAMAGES, INCLUDING LOSS OF REVENUE OR INCOME OR DATA OR
                    GOODWILL, PAIN AND SUFFERING, EMOTIONAL DISTRESS, OR SIMILAR DAMAGES,
                    ARISING OUT FROM THE USE OF ONE-MENU AND ITS CONTENT, EVEN IF ONE-MENU
                    HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>
                    <p>IN NO EVENT WILL THE COLLECTIVE LIABILITY OF ONE-MENU AND ITS SUBSIDIARIES,
                    AFFILIATES, LICENSORS, SERVICE PROVIDERS, CONTENT PROVIDERS, EMPLOYEES,
                    AGENTS, OFFICERS, AND DIRECTORS TO ANY PARTY REGARDLESS OF THE FORM OF
                    ACTION, WHETHER IN CONTRACT, TORT (INCLUDING WITHOUT LIMITATION,
                    NEGLIGENCE) UNDER STATUTE OR OTHERWISE EXCEED THE AMOUNT OF (A) FIFTY
                    POUNDS STERLING (£50.00); OR (B) THE SUMS PAID BY YOU UPON PURCHASING THE
                    APP, OR ANY IN-APP SPEND, INCLUDING SUBSCRIPTIONS, WHICHEVER IS GREATER.</p>
                </li>
                <li>
                    <p><b>Notice</b></p>
                    <p>ONE-MENU may send you, in electronic form, information about ONE-MENU, additional
                    information, and information the law requires ONE-MENU to provide.</p>
                    <p>ONE-MENU Ltd may provide required information to you by email at the address you specified
                    when you signed up for ONE-MENU. Notices emailed to you will be deemed given and received
                    when the email is sent.</p>
                    <p>Should you not consent to the receipt of electronic notices, your subscription to ONE-MENU
                    may be withdrawn.</p>
                </li>
                <li>
                    <p><b>Governing Law</b></p>
                    <p>The Terms and Conditions are governed by and construed in accordance with the laws of
                    England. Any disputes between the user and ONE-MENU Ltd and claims arising out of or
                    relating to these Terms and Conditions or your use of ONE-MENU must be resolved before the
                    Courts of London.</p>
                </li>
                <li>
                    <p><b>Changes to the Terms and Conditions</b></p>
                    <p>ONE-MENU Ltd reserves the right, in its sole discretion, to modify, alter, or otherwise change
                    these Terms and Conditions at any time.</p>
                    <p>In the event of such changes ONE MENU shall endeavour to provide notice of such changes
                    but it is your responsibility to review the Terms and Conditions periodically for any changes that
                    may occur. If you access and use the App after we have made a change to these Terms and
                    Conditions you shall be treated as having accepted the change.</p>
                    <p>Your continued use of ONE-MENU constitutes your acceptance of the Term and Conditions to
                    be bound by these changes without limitation, qualification or change. If at any time you
                    determine that you do not accept these changes, you must commit to stop using ONE-MENU.</p>
                </li>
            </ol>
          </div>
        <div className="footer-nav">
            <ul>
              <li><a className="one-menu" href="http://one-menu.com">one-menu.com</a></li>
              <li><a href="mailto:contact@one-menu.com">contact@one-menu.com</a></li>
            </ul>
          </div>
      </div>
    )
  }
};

Terms.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default Terms;
