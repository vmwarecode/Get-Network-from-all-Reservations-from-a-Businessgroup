/* 
   VMware vRealize Orchestrator 7.x action sample

   Returns a Array/(String with the Network names from all Reservations by Businessgroup

    Inputs: 
            busineeGroupName
    Output:
            Array/String with networknames
*/

if(businessGroupName != null && businessGroupName != ""){
	var cafeHost = System.getModule("com.vmware.pso.util").getConfigElementAttributeValue("Customer A/vRA/", "vRA Config", "cafeHost");
	var iaasHost = System.getModule("com.vmware.pso.util").getConfigElementAttributeValue("Customer A/vRA/", "vRA Config", "iaasHost");
	var bg = vCACCAFEEntitiesFinder.getSubtenant(cafeHost, businessGroupName);
	if(bg != null && bg != ""){
		var reservations = System.getModule("com.vmware.pso.vcac").getReservationsByBusinessGroup(bg,cafeHost,iaasHost); // Returns a array of Properties (key: name and key:id)
		var networks = [];
		for ( var i in reservations){
			try{
				System.log(reservations[i].get("reservation").getExtensionData().asMap().get("reservationNetworks").getValue()[i].getValue().asMap().get("networkPath").getLabel());
				var networkList = reservations[i].get("reservation").getExtensionData().asMap().get("reservationNetworks").getValue();
					if(networkList){
						for ( var o in networkList){
						networks.push(networkList[o].getValue().asMap().get("networkPath").getLabel());
					}
				}
			}catch(e){
			
			}
		}
	}else{
		throw("Businessgroup with name: " + businessGroupName + " not found or not unique!");
	}
}
if(networks) return networks;
var message = [];
message.push("No Networks for Businessgroup: " + businessGroupName + " found!");
return message;