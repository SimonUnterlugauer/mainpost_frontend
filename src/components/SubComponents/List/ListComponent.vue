<template>
    <div>
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="text-right">
                <tr>
                <th class="bg-gray-50 px-6 py-3 text-left text-sm font-semibold text-gray-900">ID</th>
                <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">Grund</th>
                <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Startdatum
                </th>
                <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900">
                    Enddatum
                </th>
                <th class="bg-gray-50 px-6 py-3 text-right text-sm font-semibold text-gray-900"></th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="row in listData" :key="row.id">
                    <td class="whitespace-nowrap px-6 py-4 text-left text-sm text-gray-500">{{row.id}} </td>
                    <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        <span 
                            v-if="row.reason == 'vacation'"
                            class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                            Urlaub
                        </span>    
                        <span 
                            v-else
                            class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                            Krankheit
                        </span>  
                    </td>
                    <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">{{ row.start_date }}</td>
                    <td class="whitespace-nowrap px-6 py-4 text-right text-sm text-gray-500">
                        {{ row.end_date }}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

export default {
    name: "ListComponent",
    props: {
        listData: {
            type: Array,
            required: true
        }
    },
    mounted() {
        console.log(this.listData);
    }
};

</script>