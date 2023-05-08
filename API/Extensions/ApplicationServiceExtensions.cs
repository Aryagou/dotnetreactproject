using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities.Queries;
using Application.Core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;
using FluentValidation;
using System.Reflection;
using Application.Activities.Command;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        // use this in front of the param to call the static method like services.AddApplicationService(config)
        public static IServiceCollection AddApplicationService(this IServiceCollection services, IConfiguration config)
        {
            // TODO not sure why we use this in SPA instead of AddFluentValidation
            // services.AddValidatorsFromAssembly(typeof(CreateActivityCommand).Assembly);
            services.AddDbContext<DataContext>(option =>
            {
                option.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            services.AddCors(option =>
            {
                option.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });

            services.AddMediatR(typeof(GetActivitiesQueryHandler)); // arya kind of weird way of binding
            services.AddAutoMapper(typeof(MappingProfiles)); // typeof(MappingProfiles) is marker type which means AutoMapper will scan the Assembly that contains MappingProfiles and get all the types that inherit Profile
            return services;
        }
    }
}