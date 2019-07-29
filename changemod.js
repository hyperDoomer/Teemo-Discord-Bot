function changemod($id)
{
    switch($id){
    case 0: return "**Custom**"; break;
    case 76: return "**URF**"; break;
    case 100: return "**ARAM**"; break;
    case 400: return "**5v5 Draft Pick**"; break;    
    case 420: return "**5v5 Ranked Solo/Duo**"; break;    
    case 430: return "**5v5 Blind Pick**"; break;    
    case 440: return "**5v5 Ranked Flex**"; break;    
    case 450: return "**5v5 ARAM**"; break;
    case 460: return "**3v3 Blind Pick**"; break;
    case 470: return "**3v3 Ranked Flex**"; break;
    case 1090: return "**Teamfight Tactics**"; break;
    case 1100: return "**Ranked Teamfight Tactics**"; break;
    default: return "Unknown"; break;    
    }
};
module.exports = changemod;