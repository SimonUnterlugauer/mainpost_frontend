<template>
<nav class="flex flex-1 flex-col">
    <ul role="list" class="flex flex-1 flex-col gap-y-7">
        <li>
            <ul role="list" class="-mx-2 space-y-1">
                <li>
                    <!-- Current: "bg-indigo-700 text-white", Default: "text-indigo-200 hover:text-white hover:bg-indigo-700" -->
                    <a href="/dashboard" 
                        :class="{
                        'text-indigo-200 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-indigo-700':
                            activeLink !== 'dashboard',
                        'bg-indigo-700 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold':
                            activeLink === 'dashboard',
                        }"
                        @click="setActiveLink('dashboard')"
                    >
                        <svg 
                            class="h-6 w-6 shrink-0"
                            :class="{
                                'text-white': activeLink == 'dashboard',
                                'text-indigo-200 group-hover:text-white': activeLink !== 'dashboard',
                            }"
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke-width="1.5" 
                            stroke="currentColor" 
                            aria-hidden="true"
                            >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        Dashboard
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        :class="{
                        'text-indigo-200 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-indigo-700':
                            activeLink !== 'team',
                        'bg-indigo-700 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold':
                            activeLink === 'team',
                        }"
                        @click="toggleExpanded('team')"
                    >
                        <svg 
                            class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke-width="1.5" 
                            stroke="currentColor" 
                            aria-hidden="true"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                        </svg>
                        Team
                        <!-- Expanded: "rotate-90 text-gray-500", Collapsed: "text-gray-400" -->
                        <svg 
                            class="text-gray-400 ml-auto h-5 w-5 shrink-0" 
                            :class="{'rotate-90 text-white': expandedTeam === true}"
                            viewBox="0 0 20 20" 
                            fill="currentColor" 
                            aria-hidden="true"
                        >
                            <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                        </svg>
                    </a>
                    <!-- Expandable link section, show/hide based on state. -->
                    <ul v-if="expandedTeam" class="mt-1 px-2 text text-indigo-200 group-hover:text-white" id="sub-menu-1">
                        <li>
                        <!-- 44px -->
                        <a 
                            href="/employees" 
                            class="hover:bg-indigo-700 hover:text-white block rounded-md py-2 pr-2 pl-9 text-sm leading-6"
                            @click="setActiveLink('team')"
                            >
                                Mitarbeiter
                            </a>
                        </li>
                        <li>
                        <!-- 44px -->
                            <a 
                            href="/absences" 
                            class="hover:bg-indigo-700 hover:text-white block rounded-md py-2 pr-2 pl-9 text-sm leading-6"
                            @click="setActiveLink('team')"
                            >
                                Fehltage
                            </a>
                        </li>
                        <li>
                        </li>
                    </ul>
                </li>
                <li>
                    <a 
                        href="#" 
                        :class="{
                        'text-indigo-200 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-indigo-700':
                            activeLink !== 'delivery_area',
                        'bg-indigo-700 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold':
                            activeLink === 'delivery_area',
                        }"
                        @click="setActiveLink('delivery_area')"
                    >
                        <svg class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
                        </svg>
                        Liefergebiete
                    </a>
                </li>
                <li>
                    <a 
                        href="#" 
                        :class="{
                        'text-indigo-200 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold hover:bg-indigo-700':
                            activeLink !== 'calendar',
                        'bg-indigo-700 text-white group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold':
                            activeLink === 'calendar',
                        }"
                        @click="setActiveLink('calendar')"
                    >
                        <svg class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                        Calendar
                    </a>
                </li>
                <li>
                    <a href="#" class="text-indigo-200 hover:text-white hover:bg-indigo-700 group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold">
                        <svg class="h-6 w-6 shrink-0 text-indigo-200 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                        </svg>
                        Dokumente
                    </a>
                </li>
            </ul>
        </li>
    </ul>
</nav>
</template>

<script>
export default {
  name: "MainNavigation",

  data() {
    return {
        activeLink: localStorage.getItem('activeLink') || '', // Hier wird der Zustand des aktiven Links gespeichert
        expandedTeam:  false, 
        expandedArea: false,
    };
  },
  methods: {
    setActiveLink(link) {
      this.activeLink = link;
      localStorage.setItem('activeLink', link); // Den Wert in den LocalStorage speichern
    },
    toggleExpanded(area) {
        console.log("Hallo");
        if (area === 'team') {
            this.expandedTeam = !this.expandedTeam;
        } 
        else if (area === 'area') {
            this.expandedArea = !this.expandedArea;
        }
    },
  },
};
</script>