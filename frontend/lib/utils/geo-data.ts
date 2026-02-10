// India States Geographic Data for Heatmap
// SVG paths for Indian states simplified for visualization

export interface StatePathData {
    name: string
    path: string
}

export const INDIA_STATES_PATH: Record<string, StatePathData> = {
    'MH': {
        name: 'Maharashtra',
        path: 'M180,380 L220,360 L260,370 L280,400 L260,440 L220,450 L180,430 Z',
    },
    'DL': {
        name: 'Delhi',
        path: 'M255,195 L270,190 L275,205 L265,215 L250,210 Z',
    },
    'KA': {
        name: 'Karnataka',
        path: 'M160,450 L200,440 L240,450 L250,500 L220,530 L180,520 L150,490 Z',
    },
    'TN': {
        name: 'Tamil Nadu',
        path: 'M220,530 L260,520 L290,550 L280,600 L240,620 L200,590 L210,550 Z',
    },
    'GJ': {
        name: 'Gujarat',
        path: 'M100,320 L150,300 L180,320 L170,370 L130,390 L90,370 L80,340 Z',
    },
    'UP': {
        name: 'Uttar Pradesh',
        path: 'M260,220 L340,210 L380,250 L350,300 L290,310 L250,280 Z',
    },
    'WB': {
        name: 'West Bengal',
        path: 'M400,280 L430,270 L450,320 L440,380 L410,400 L380,350 L390,300 Z',
    },
    'RJ': {
        name: 'Rajasthan',
        path: 'M140,220 L200,200 L250,220 L260,280 L220,320 L160,320 L120,280 Z',
    },
    'AP': {
        name: 'Andhra Pradesh',
        path: 'M260,440 L320,420 L370,460 L360,520 L300,540 L250,500 Z',
    },
    'MP': {
        name: 'Madhya Pradesh',
        path: 'M200,310 L280,300 L340,330 L330,380 L260,400 L200,380 Z',
    },
    'BR': {
        name: 'Bihar',
        path: 'M360,260 L400,250 L420,280 L400,310 L360,300 Z',
    },
    'JH': {
        name: 'Jharkhand',
        path: 'M370,310 L410,300 L430,340 L410,370 L370,360 Z',
    },
    'OR': {
        name: 'Odisha',
        path: 'M350,380 L400,370 L430,420 L400,470 L350,450 Z',
    },
    'KL': {
        name: 'Kerala',
        path: 'M180,540 L210,530 L220,590 L200,640 L175,630 L170,580 Z',
    },
    'PB': {
        name: 'Punjab',
        path: 'M210,160 L250,150 L265,180 L250,210 L215,200 Z',
    },
    'HR': {
        name: 'Haryana',
        path: 'M230,190 L260,180 L275,210 L260,240 L235,230 L225,210 Z',
    },
    'AS': {
        name: 'Assam',
        path: 'M470,250 L540,240 L560,270 L520,300 L470,290 Z',
    },
    'TS': {
        name: 'Telangana',
        path: 'M260,400 L310,390 L340,420 L320,460 L270,450 Z',
    },
    'CG': {
        name: 'Chhattisgarh',
        path: 'M330,360 L370,350 L390,400 L370,440 L330,420 Z',
    },
    'UK': {
        name: 'Uttarakhand',
        path: 'M280,160 L320,150 L340,180 L320,210 L285,195 Z',
    },
    'HP': {
        name: 'Himachal Pradesh',
        path: 'M260,130 L300,120 L320,145 L300,170 L265,160 Z',
    },
    'JK': {
        name: 'Jammu & Kashmir',
        path: 'M230,80 L290,60 L320,100 L290,140 L240,130 L220,100 Z',
    },
    'GA': {
        name: 'Goa',
        path: 'M155,480 L175,475 L180,495 L165,505 Z',
    },
    'NE': {
        name: 'Northeast',
        path: 'M490,220 L560,200 L590,250 L560,310 L500,300 Z',
    },
}

// State code to full name mapping
export const STATE_NAMES: Record<string, string> = {
    'AP': 'Andhra Pradesh',
    'AR': 'Arunachal Pradesh',
    'AS': 'Assam',
    'BR': 'Bihar',
    'CG': 'Chhattisgarh',
    'GA': 'Goa',
    'GJ': 'Gujarat',
    'HR': 'Haryana',
    'HP': 'Himachal Pradesh',
    'JH': 'Jharkhand',
    'KA': 'Karnataka',
    'KL': 'Kerala',
    'MP': 'Madhya Pradesh',
    'MH': 'Maharashtra',
    'MN': 'Manipur',
    'ML': 'Meghalaya',
    'MZ': 'Mizoram',
    'NL': 'Nagaland',
    'OR': 'Odisha',
    'PB': 'Punjab',
    'RJ': 'Rajasthan',
    'SK': 'Sikkim',
    'TN': 'Tamil Nadu',
    'TS': 'Telangana',
    'TR': 'Tripura',
    'UK': 'Uttarakhand',
    'UP': 'Uttar Pradesh',
    'WB': 'West Bengal',
    'DL': 'Delhi',
    'JK': 'Jammu & Kashmir',
    'LA': 'Ladakh',
    'PY': 'Puducherry',
    'CH': 'Chandigarh',
    'AN': 'Andaman & Nicobar',
    'DN': 'Dadra & Nagar Haveli',
    'DD': 'Daman & Diu',
    'LD': 'Lakshadweep',
}

// Get state name from code
export function getStateName(code: string): string {
    return STATE_NAMES[code] || code
}

// Color scale for geographic heatmap
export function getGeoHeatColor(percentage: number): string {
    if (percentage >= 20) return '#dc2626'   // red-600
    if (percentage >= 15) return '#ea580c'   // orange-600
    if (percentage >= 10) return '#d97706'   // amber-600
    if (percentage >= 5) return '#ca8a04'    // yellow-600
    if (percentage >= 2) return '#65a30d'    // lime-600
    if (percentage > 0) return '#16a34a'     // green-600
    return '#e5e7eb'                          // gray-200
}
