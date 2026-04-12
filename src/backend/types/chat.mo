module {
  public type Role = { #user; #assistant };

  public type Message = {
    role : Role;
    content : Text;
    timestamp : Int;
  };
};
