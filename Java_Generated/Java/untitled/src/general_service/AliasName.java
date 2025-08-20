package general_service;

import general_service.interfaces.IAlias;
import general_service.interfaces.IAliasName;

public class AliasName implements IAliasName {
   IAlias alias;
   String name;

   public AliasName(IAlias alias, String name)
   {
       this.alias = alias;
       this.name = name;
   }

    @Override
    public Object getAliasNameValue() {
        return alias.getAliasValue(name);
    }

    @Override
    public void setAliasNameValue(Object value) {
        alias.setAliasValue(name, value);
    }

    @Override
    public IAlias getAlias() {
        return alias;
    }

    @Override
    public String getNameOfAliasName() {
        return name;
    }
}
