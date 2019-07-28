function changereg($reg)
{
    switch($reg){
    case 'BR': return "BR1"; break;
    case 'JP': return "JP1"; break;
    case 'EUW': return "EUW1"; break;
    case 'NA': return "NA1"; break;    
    case 'EUNE': return "EUN1"; break;    
    case 'OCE': return "OC1"; break;    
    case 'LAN': return "LA1"; break;    
    case 'LAS': return "LA2"; break;
    case 'KR': return "KR"; break;
    case 'RU': return "RU"; break;
    case 'TR': return "TR1"; break;    
    }
};
module.exports = changereg;