<template>
    <div>
        <div class="pg-footer">
            <footer class="footer">
                <svg class="footer-wave-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 100"
                    preserveAspectRatio="none">
                    <path class="footer-wave-path"
                        d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z">
                    </path>
                </svg>
                <div class="footer-content">
                    <div class="footer-content-column">
                        <div class="footer-logo">
                            <nuxt-link class="footer-logo-link" to="">
                                <span class="hidden-link-text">LOGO</span>
                                <img src="https://justfields.com/storage/projects/7M5rV059/LOGO2white.png" />
                            </nuxt-link>
                        </div>

                    </div>
                    <div class="footer-content-column">
                        <div class="footer-menu">
                            <h2 class="footer-menu-name">Quick Links</h2>
                            <ul id="menu-company" class="footer-menu-list">
                                <li class="menu-item menu-item-type-post_type menu-item-object-page">
                                    <nuxt-link to="/">{{ $t('footer.home') }}</nuxt-link>
                                </li>
                                <li class="menu-item menu-item-type-taxonomy menu-item-object-category">
                                    <nuxt-link to="/all-products">{{ $t('footer.products') }}</nuxt-link>
                                </li>
                                <li class="menu-item menu-item-type-post_type menu-item-object-page">
                                    <nuxt-link to="/contact-us.vue">{{ $t('footer.contact_us') }}</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-content-column">
                        <div class="footer-menu">
                            <h2 class="footer-menu-name">Categories</h2>
                            <ul id="menu-quick-links" class="footer-menu-list">
                                <li class="menu-item menu-item-type-custom menu-item-object-custom"
                                    v-for="card in store.categories" :key="card">
                                    <nuxt-link rel="noopener noreferrer"
                                        :to="{ path: '/all-products', query: { categoryId: card.id } }">{{ $i18n.locale
                                            === 'ar'
                                            ?
                                            card?.titleAr :
                                        card?.title }}</nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-content-column">
                        <h2 class="footer-call-to-action-title">
                            <div class="flex items-center mt-4 space-s-2">
                                <i class="fa-solid fa-location-dot"></i>
                                <span class="line-clamp-2">{{
                                    $t('footer.factory_damietta_dam_road_angar_logar_furniture')
                                }}</span>
                            </div>
                        </h2>
                        <h2 class="footer-call-to-action-title">
                            <div class="flex items-center mt-4 space-s-2">
                                <i class="fa-solid fa-location-dot"></i>
                                <span class="line-clamp-2">{{
                                    $t('footer.damietta_exhibition_port_said_road_behind_al_baqari_cars') }}</span>
                            </div>
                        </h2>
                        <h2 class="footer-call-to-action-title">
                            <div class="flex items-center mt-4 space-s-2">
                                <i class="fa-solid fa-location-dot"></i>
                                <span class="line-clamp-2">{{
                                    $t('footer.fifth_settlement_lotus_exhibition_iin_front_of_platinum_club_next_to_skyline_school')
                                }}</span>
                            </div>
                        </h2>
                        <div class="footer-call-to-action">
                            <h2 class="footer-call-to-action-title">You Call Us</h2>
                            <p class="footer-call-to-action-link-wrapper">
                                <nuxt-link class="footer-call-to-action-link" to="tel:0124-64XXXX" target="_self">+20
                                    122 409 1737</nuxt-link>
                            </p>
                        </div>
                    </div>
                    <div class="footer-social-links">
                        <svg class="footer-social-amoeba-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 236 54">
                            <path class="footer-social-amoeba-path"
                                d="M223.06,43.32c-.77-7.2,1.87-28.47-20-32.53C187.78,8,180.41,18,178.32,20.7s-5.63,10.1-4.07,16.7-.13,15.23-4.06,15.91-8.75-2.9-6.89-7S167.41,36,167.15,33a18.93,18.93,0,0,0-2.64-8.53c-3.44-5.5-8-11.19-19.12-11.19a21.64,21.64,0,0,0-18.31,9.18c-2.08,2.7-5.66,9.6-4.07,16.69s.64,14.32-6.11,13.9S108.35,46.5,112,36.54s-1.89-21.24-4-23.94S96.34,0,85.23,0,57.46,8.84,56.49,24.56s6.92,20.79,7,24.59c.07,2.75-6.43,4.16-12.92,2.38s-4-10.75-3.46-12.38c1.85-6.6-2-14-4.08-16.69a21.62,21.62,0,0,0-18.3-9.18C13.62,13.28,9.06,19,5.62,24.47A18.81,18.81,0,0,0,3,33a21.85,21.85,0,0,0,1.58,9.08,16.58,16.58,0,0,1,1.06,5A6.75,6.75,0,0,1,0,54H236C235.47,54,223.83,50.52,223.06,43.32Z">
                            </path>
                        </svg>
                        <nuxt-link class="footer-social-link linkedin"
                            to="https://www.facebook.com/lugarinv?mibextid=ZbWKwL" target="_blank">
                            <span class="hidden-link-text">facebook</span>
                            <i class="text-2xl fa-brands fa-facebook footer-social-icon-svg"></i>
                        </nuxt-link>

                        <nuxt-link class="footer-social-link twitter" to="https://wa.me/201023351915" target="_blank">
                            <span class="hidden-link-text">whatsapp</span>
                            <i class="text-2xl fa-brands fa-whatsapp footer-social-icon-svg"></i>
                        </nuxt-link>

                        <nuxt-link class="footer-social-link youtube" to="https://www.instagram.com/lugar_furniture"
                            target="_blank">
                            <span class="hidden-link-text">instagram</span>
                            <i class="text-2xl fa-brands fa-instagram footer-social-icon-svg">
                            </i>
                        </nuxt-link>

                        <nuxt-link class="footer-social-link github"
                            to="https://www.tiktok.com/@lugarfurnitureinv?_t=8sj2O0ysXQo&_r=1" target="_blank">
                            <span class="hidden-link-text">tiktok</span>
                            <i class="text-2xl fa-brands fa-tiktok footer-social-icon-svg">
                            </i>
                        </nuxt-link>
                    </div>
                </div>
                <div class="footer-copyright">
                    <div class="footer-copyright-wrapper">
                        <p class="footer-copyright-text">
                            <nuxt-link class="footer-copyright-link" to="#" target="_self"> ©2025. | Designed By: Lugar
                                Store
                                | All rights reserved. </nuxt-link>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    </div>
</template>

<script setup>
const store = useCategoriesStore()

onMounted(() => {
    store.fetchCategories();
});
</script>

<style scoped>
nuxt-link {
    color: #fff;
    text-decoration: none;
}

.pg-footer {
    font-family: 'Roboto', sans-serif;
}

.footer {
    background-color: #004658;
    color: #fff;
}

.footer-wave-svg {
    background-color: transparent;
    display: block;
    height: 30px;
    position: relative;
    top: -1px;
    width: 100%;
}

.footer-wave-path {
    fill: #fffff2;
}

.footer-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 1230px;
    padding: 40px 15px 450px;
    position: relative;
}

.footer-content-column {
    box-sizing: border-box;
    float: left;
    padding-left: 15px;
    padding-right: 15px;
    width: 100%;
    color: #fff;
}

.footer-content-column ul li a {
    color: #fff;
    text-decoration: none;
}

.footer-logo-link {
    display: inline-block;
}

.footer-menu {
    margin-top: 30px;
}

.footer-menu-name {
    color: #fffff2;
    font-size: 15px;
    font-weight: 900;
    letter-spacing: .1em;
    line-height: 18px;
    margin-bottom: 0;
    margin-top: 0;
}

.footer-menu-list {
    list-style: none;
    margin-bottom: 0;
    margin-top: 10px;
    padding-left: 0;
}

.footer-menu-list li {
    margin-top: 5px;
}

.footer-call-to-action-description {
    color: #fffff2;
    margin-top: 10px;
    margin-bottom: 20px;
}

.footer-call-to-action-button:hover {
    background-color: #fffff2;
    color: #00bef0;
}

.button:last-of-type {
    margin-right: 0;
}

.footer-call-to-action-button {
    background-color: #027b9a;
    border-radius: 21px;
    color: #fffff2;
    display: inline-block;
    font-size: 11px;
    font-weight: 900;
    letter-spacing: .1em;
    line-height: 18px;
    padding: 12px 30px;
    margin: 0 10px 10px 0;
    text-decoration: none;
    text-transform: uppercase;
    transition: background-color .2s;
    cursor: pointer;
    position: relative;
}

.footer-call-to-action {
    margin-top: 30px;
}

.footer-call-to-action-title {
    color: #fffff2;
    font-size: 14px;
    font-weight: 900;
    letter-spacing: .1em;
    line-height: 18px;
    margin-bottom: 0;
    margin-top: 0;
}

.footer-call-to-action-link-wrapper {
    margin-bottom: 0;
    margin-top: 10px;
    color: #fff;
    text-decoration: none;
}

.footer-call-to-action-link-wrapper a {
    color: #fff;
    text-decoration: none;
}

.footer-social-links {
    bottom: 0;
    height: 54px;
    position: absolute;
    right: 0;
    width: 236px;
}

.footer-social-amoeba-svg {
    height: 54px;
    left: 0;
    display: block;
    position: absolute;
    top: 0;
    width: 236px;
}

.footer-social-amoeba-path {
    fill: #027b9a;
}

.footer-social-link.linkedin {
    height: 26px;
    left: 3px;
    top: 11px;
    width: 26px;
}

.footer-social-link {
    display: block;
    padding: 10px;
    position: absolute;
}

.hidden-link-text {
    position: absolute;
    clip: rect(1px 1px 1px 1px);
    clip: rect(1px, 1px, 1px, 1px);
    -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
    clip-path: inset(0px 0px 99.9% 99.9%);
    overflow: hidden;
    height: 1px;
    width: 1px;
    padding: 0;
    border: 0;
    top: 50%;
}

.footer-social-icon-svg {
    display: block;
    fill: #fffff2;
    transition: fill .2s;
}

.footer-social-link.twitter {
    height: 28px;
    left: 62px;
    top: 3px;
    width: 28px;
}

.footer-social-link.youtube {
    height: 24px;
    left: 123px;
    top: 12px;
    width: 24px;
}

.footer-social-link.github {
    height: 34px;
    left: 172px;
    top: 7px;
    width: 34px;
}

.footer-copyright {
    background-color: #027b9a;
    color: #fff;
    padding: 15px 30px;
    text-align: center;
}

.footer-copyright-wrapper {
    margin-left: auto;
    margin-right: auto;
    max-width: 1200px;
}

.footer-copyright-text {
    color: #fff;
    font-size: 13px;
    font-weight: 400;
    line-height: 18px;
    margin-bottom: 0;
    margin-top: 0;
}

.footer-copyright-link {
    color: #fff;
    text-decoration: none;
}

@media (min-width:320px) and (max-width:479px) {
    .footer-content {
        margin-left: auto;
        margin-right: auto;
        max-width: 1230px;
        padding: 40px 15px 1050px;
        position: relative;
    }
}

@media (min-width:480px) and (max-width:599px) {
    .footer-content {
        margin-left: auto;
        margin-right: auto;
        max-width: 1230px;
        padding: 40px 15px 1050px;
        position: relative;
    }
}

@media (min-width:600px) and (max-width: 800px) {
    .footer-content {
        margin-left: auto;
        margin-right: auto;
        max-width: 1230px;
        padding: 40px 15px 1050px;
        position: relative;
    }
}

@media (min-width: 760px) {
    .footer-content {
        margin-left: auto;
        margin-right: auto;
        max-width: 1230px;
        padding: 40px 15px 450px;
        position: relative;
    }

    .footer-wave-svg {
        height: 50px;
    }

    .footer-content-column {
        width: 24.99%;
    }
}
</style>