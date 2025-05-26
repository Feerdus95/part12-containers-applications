#!/bin/bash

# Colors for terminal output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Docker Compose files
DEV_COMPOSE="docker-compose -f docker-compose.dev.yml"
PROD_COMPOSE="docker-compose -f docker-compose.yml"

# Function to check if Docker is running
check_docker() {
  if ! docker info >/dev/null 2>&1; then
    echo -e "${RED}❌ Docker is not running. Please start Docker and try again.${NC}"
    exit 1
  fi
}

# Function to display help
show_help() {
  echo -e "${BLUE}Usage: ./start.sh [command]${NC}"
  echo -e "\nAvailable commands:"
  echo -e "  ${GREEN}dev${NC}       Start development environment"
  echo -e "  ${GREEN}prod${NC}      Start production environment"
  echo -e "  ${GREEN}stop${NC}      Stop all containers"
  echo -e "  ${GREEN}restart${NC}   Restart containers"
  echo -e "  ${GREEN}logs${NC}      View logs"
  echo -e "  ${GREEN}help${NC}      Show this help message"
  echo -e "\nExamples:"
  echo -e "  ${YELLOW}./start.sh dev${NC}    Start development environment"
  echo -e "  ${YELLOW}./start.sh stop${NC}   Stop all containers"
}

# Function to start services
start_services() {
  local env=$1
  local compose_cmd=$([ "$env" = "prod" ] && echo "$PROD_COMPOSE" || echo "$DEV_COMPOSE")
  
  echo -e "${BLUE}══════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}🚀 Starting NoteApp in ${env} mode...${NC}"
  echo -e "${BLUE}══════════════════════════════════════════════════════${NC}"
  
  check_docker
  
  # Build and start services
  $compose_cmd up --build -d
  
  # Show status
  $compose_cmd ps
  
  echo -e "\n${GREEN}✅ Services started successfully!${NC}"
  
  if [ "$env" = "dev" ]; then
    echo -e "\n${YELLOW}Development URLs:"
    echo -e "  Frontend: ${GREEN}http://localhost${NC}"
    echo -e "  Backend API: ${GREEN}http://localhost/api${NC}"
    echo -e "  Database: ${GREEN}postgres://noteuser:notepass@localhost:5432/noteapp${NC}"
  else
    echo -e "\n${YELLOW}Production URLs:"
    echo -e "  Application: ${GREEN}http://localhost${NC}"
    echo -e "  API: ${GREEN}http://localhost/api${NC}"
  fi
  
  echo -e "\n${YELLOW}To view logs, run: ${GREEN}./start.sh logs${NC}"
  echo -e "${YELLOW}To stop services, run: ${GREEN}./start.sh stop${NC}"
}

# Function to stop services
stop_services() {
  echo -e "${YELLOW}🛑 Stopping NoteApp services...${NC}"
  
  # Stop both dev and prod containers to be safe
  $DEV_COMPOSE down
  $PROD_COMPOSE down
  
  echo -e "\n${GREEN}✅ All services stopped and containers removed.${NC}"
}

# Function to show logs
show_logs() {
  local env=$1
  local compose_cmd=$([ "$env" = "prod" ] && echo "$PROD_COMPOSE" || echo "$DEV_COMPOSE")
  
  echo -e "${YELLOW}Showing logs for ${env} environment (press Ctrl+C to exit)...${NC}"
  $compose_cmd logs -f
}

# Main script execution
case "$1" in
  dev)
    start_services "dev"
    ;;
  prod)
    start_services "prod"
    ;;
  stop)
    stop_services
    ;;
  restart)
    stop_services
    start_services "${2:-dev}"  # Default to dev if no environment specified
    ;;
  logs)
    show_logs "${2:-dev}"  # Default to dev if no environment specified
    ;;
  help|--help|-h|'')
    show_help
    ;;
  *)
    echo -e "${RED}❌ Unknown command: $1${NC}"
    show_help
    exit 1
    ;;
esac
