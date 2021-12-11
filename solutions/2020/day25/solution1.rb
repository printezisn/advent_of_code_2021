def calculate_loop_size(public_key)
  loop_size = 0
  current = 1

  while current != public_key
    loop_size += 1
    current *= 7
    current %= 20201227
  end

  loop_size
end

def calculate_encryption_key(public_key, loop_size)
  current = 1

  loop_size.times do
    current *= public_key
    current %= 20201227
  end

  current
end

card_public_key = 1526110
door_public_key = 20175123

card_loop_size = calculate_loop_size(card_public_key)
door_loop_size = calculate_loop_size(door_public_key)

puts "Card encryption key: #{calculate_encryption_key(card_public_key, door_loop_size)}"
puts "Door encryption key: #{calculate_encryption_key(door_public_key, card_loop_size)}"