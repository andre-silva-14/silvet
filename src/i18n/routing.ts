import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['pl', 'en', 'de', 'pt'],
  defaultLocale: 'pl'
});

export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
