resource "vercel_project" "shomotsu" {
    auto_assign_custom_domains                        = true
    automatically_expose_system_environment_variables = true
    customer_success_code_visibility                  = false
    directory_listing                                 = false
    framework                                         = "nextjs"
    function_failover                                 = false
    git_fork_protection                               = true
    git_lfs                                           = false
    name                                              = "shomotsu"
    node_version                                      = "22.x"
    oidc_token_config                                 = {
        enabled     = false
        issuer_mode = "global"
    }
    prioritise_production_builds                      = true
    resource_config                                   = {
        fluid = false
    }
    serverless_function_region                        = "iad1"
    team_id                                           = var.vercel_team_id
    vercel_authentication                             = {
        deployment_type = "standard_protection"
    }
}

resource "vercel_attack_challenge_mode" "shomotsu_attack_Challenge_mode" {
  project_id = vercel_project.shomotsu.id
  enabled = true
}

resource "vercel_firewall_config" "shomotsu_firewall_config" {
    project_id = vercel_project.shomotsu.id
    team_id    = var.vercel_team_id

    rules {
        rule {
            action          = {
                action = "deny"
            }
            condition_group = [
                {
                    conditions = [
                        {
                            op    = "neq"
                            type  = "geo_country"
                            value = "JP"
                        },
                    ]
                },
            ]
            description     = "Block Access From Foreign Countries"
            name            = "Block Access From Foreign Countries"
        }
    }
}

resource "vercel_project_domain" "shomotsu_apex_domain" {
    domain               = "shomotsu.net"
    project_id           = vercel_project.shomotsu.id
    redirect             = "www.shomotsu.net"
    redirect_status_code = 307
    team_id              = var.vercel_team_id
}

resource "vercel_project_domain" "shomotsu_www_domain" {
    domain               = "www.shomotsu.net"
    project_id           = vercel_project.shomotsu.id
    redirect             = null
    redirect_status_code = 307
    team_id              = var.vercel_team_id
}