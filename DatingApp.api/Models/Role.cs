using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace DatingApp.api.Models
{
    public class Role : IdentityRole<int>
    {
        public ICollection<UserRole> UserRoles { get; set; }
    }
}