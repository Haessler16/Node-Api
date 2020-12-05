import Role from "../models/roles";
export const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();
        if (count > 0) return;
        const value = await Promise.all([
          new Role({ name: "user" }).save(),
          new Role({ name: "moderator" }).save(),
          new Role({ name: "admin" }).save(),
        ]);
        console.log(value)
    } catch (error) {
        console.log("Roles Error:",error.message)
    }
};
