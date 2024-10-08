export default class Roles {
  static roles = ["not_verified", "verified", "moderator", "administrator"];

  static compareRoles(role1, role2) {
    const roleIndex1 = this.roles.indexOf(role1);
    const roleIndex2 = this.roles.indexOf(role2);
    if (roleIndex1 == -1) {
      throw new Error("No such role - " + role1);
    }
    if (roleIndex2 == -1) {
      throw new Error("No such role - " + role2);
    }
    return roleIndex2 - roleIndex1;
  }
}