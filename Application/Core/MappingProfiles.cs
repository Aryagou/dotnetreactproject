using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            // arya interesting that we can map one type to the same type to save some typing
            CreateMap<Activity, Activity>();
        }
    }
}