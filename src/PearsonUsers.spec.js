import React from "react";
import { mount, shallow, render } from "enzyme";
import { PearsonUsers, List } from "./PearsonUsers";


describe("PearsonUsers", () => {
  let component;

  beforeEach(() => {
    component = shallow(<PearsonUsers />); 
  });

  it("renders a h1", () => {
    const h1 = component.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  /* In PearsonUsers.js, render a list of users from the state, 
   * displaying first_name, last_name and the avatar. */
	

 it('Render a list of users from the state', () => {
        let nameString = "";
        component.state().users.forEach((node) => {
          nameString = `${nameString}${node.first_name} ${node.last_name}`;
         // nameString += node.first_name+" "+node.last_name;
        });
        expect(component.find(List).render().find("p").text()).toEqual(nameString);
  });

/*  In PearsonUsers.js, add functionality to 
 *  remove duplicated users from the state. */
 it('Functionality to remove duplicated users from the state', () => {
    
      component.update();
      let flag = false;  
        component.update().state().users.forEach((node,key) => {
            component.state().users.forEach((node2,key2) => {
              if(key !== key2 && node.id === node2.id) {
                flag = true;
              }
            });
        });
        expect(flag).toEqual(false);    
  });

/*  In PearsonUsers.js, add functionality to 
 *  delete a user from the state. */
  it('Add functionality to delete a user from the state', () => {
     let flag = true;  
     component.state().users.forEach((node) => {
          if (node.id === 7) flag = false;
        });
      component.find('h1').simulate('click');
      expect(flag).toEqual(true); 
  });

/*  Can you refactor PearsonUsers.js to use a new component to 
 *  render each user profile. */
  it('New Component to render each profile', () => {
       expect(component.find(List).render().find("li").length).toBe(component.state().users.length); 
  });

});
