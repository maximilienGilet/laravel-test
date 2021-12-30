require('./bootstrap');

import React from 'react';
import { render } from 'react-dom';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import { ChakraProvider } from '@chakra-ui/react'
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import frenchTranslations from "@/Translations/fr";

const appName = window.document.getElementsByTagName('title')[0]?.innerText || 'Laravel';

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        // the translations
        // (tip move them in a JSON file and import them,
        // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
        resources: {
            fr: {
                translation: frenchTranslations
            }
        },
        lng: "fr", // if you're using a language detector, do not define the lng option
        fallbackLng: "fr",

        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        }
    });

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => require(`./Pages/${name}`),
    setup({ el, App, props }) {
        return render((
            <ChakraProvider>
                <App {...props} />
            </ChakraProvider>
        ), el);
    },
});

InertiaProgress.init({ color: '#4B5563' });
