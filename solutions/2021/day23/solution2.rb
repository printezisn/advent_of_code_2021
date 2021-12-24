def moves(state, player)
  return [] if player.in_destination_room? && state.room_complete?(player.destination_room)

  new_positions = []

  (player.position[0] - 1).downto(1).each do |i|
    return [] if state.occupied_spots[[i, player.position[1]]]
  end

  (player.position[1] - 1).downto(1).each do |i|
    break if state.occupied_spots[[1, i]]

    new_positions << [1, i] if player.in_room? && ![3, 5, 7, 9].include?(i)

    next if i != player.destination_room || !state.can_enter_destination_room?(player)

    room_position = state.available_spot_in_destination_room(player)

    new_positions << room_position if room_position
  end

  ((player.position[1] + 1)..11).each do |i|
    break if state.occupied_spots[[1, i]]

    new_positions << [1, i] if player.in_room? && ![3, 5, 7, 9].include?(i)

    next if i != player.destination_room || !state.can_enter_destination_room?(player)

    room_position = state.available_spot_in_destination_room(player)

    new_positions << room_position if room_position
  end

  new_positions
end

def total_steps(position1, position2)
  position1[0] - 1 + position2[0] - 1 + (position2[1] - position1[1]).abs
end

def calculate(state)
  min_energy_spent = Float::INFINITY

  checked_states = {}
  state_scores = { state.to_s => 0 }
  open_states = [state]

  until open_states.empty?
    state = open_states.pop

    next if checked_states[state.to_s]

    checked_states[state.to_s] = true

    if state.terminal?
      min_energy_spent = state_scores[state.to_s]
      next
    end

    state.players.each do |player|
      moves(state, player).each do |new_position|
        new_state = state.move(player, new_position)

        score = state_scores[state.to_s] + total_steps(player.position, new_position) * player.energy_consumption
        if !state_scores[new_state.to_s] || score < state_scores[new_state.to_s]
          state_scores[new_state.to_s] = score
          checked_states[new_state.to_s] = false
        end

        open_states << new_state
      end
    end
  end

  min_energy_spent
end

Player = Struct.new(:type, :position) do
  def order
    type.ord - 'A'.ord
  end

  def destination_room
    3 + order * 2
  end

  def in_room?
    position[0] > 1
  end

  def in_destination_room?
    in_room? && position[1] == destination_room
  end

  def energy_consumption
    10.pow(order)
  end
end

State = Struct.new(:players, :occupied_spots) do
  def initialize(players = [], occupied_spots = {})
    super(players, occupied_spots)
  end

  def dup
    new_state = State.new

    players.each do |player|
      new_player = player.dup

      new_state.players << new_player
      new_state.occupied_spots[new_player.position] = new_player
    end

    new_state
  end

  def move(player, new_position)
    new_state = dup

    new_player = new_state.occupied_spots[player.position]

    new_state.occupied_spots.delete(new_player.position)
    new_player.position = new_position
    new_state.occupied_spots[new_player.position] = new_player

    new_state
  end

  def terminal?
    players.all?(&:in_destination_room?)
  end

  def room_complete?(room)
    types = (2..5).map { |i| occupied_spots[[i, room]]&.type }

    types.compact.size == 4 && types.uniq.size == 1
  end

  def can_enter_destination_room?(player)
    (2..5).each do |i|
      return false if occupied_spots[[i, player.destination_room]] &&
                      occupied_spots[[i, player.destination_room]].type != player.type
    end

    true
  end

  def available_spot_in_destination_room(player)
    position = nil

    (2..5).each do |i|
      break if occupied_spots[[i, player.destination_room]]

      position = [i, player.destination_room]
    end

    position
  end

  def to_a
    @to_a ||= players.map { |player| [player.type] + player.position }.sort
  end

  def to_s
    @to_s ||= to_a.to_s
  end
end

state = State.new

lines = File.read(File.join(File.dirname(__FILE__), 'input.txt')).lines.map(&:chomp)
lines = [
  lines[0],
  lines[1],
  lines[2],
  '  #D#C#B#A#',
  '  #D#B#A#C#',
  lines[3],
  lines[4]
]

(3..9).step(2).each do |j|
  (2..5).each do |i|
    player = Player.new(lines[i][j], [i, j])

    state.players << player
    state.occupied_spots[player.position] = player
  end
end

puts calculate(state)
